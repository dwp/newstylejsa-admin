// Module alias for tidier module paths
require('module-alias/register')

// Core dependencies
const crypto = require('crypto')
const path = require('path')

// NPM dependencies
const bodyParser = require('body-parser')
const browserSync = require('browser-sync')
const dotenv = require('dotenv')
const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const cookieParser = require('cookie-parser')

// Local dependencies
const config = require('./app/config.js')
const claimsConfig = require('./app/data/claims-defaults.js')
const packageJson = require('./package.json')
const app = express()
const utils = require('./lib/utils.js')

const documentationApp = express()
dotenv.config()

// Set cookies for use in cookie banner.
app.use(cookieParser())
documentationApp.use(cookieParser())
const handleCookies = utils.handleCookies(app)
app.use(handleCookies)
documentationApp.use(handleCookies)

// Set up configuration variables
var releaseVersion = packageJson.version
var username = process.env.USERNAME
var password = process.env.PASSWORD
var env = process.env.NODE_ENV || 'development'
var useAuth = process.env.USE_AUTH || config.useAuth
var useAutoStoreData = process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData
var useHttps = process.env.USE_HTTPS || config.useHttps
var useBrowserSync = config.useBrowserSync
var gtmId = process.env.GOOGLE_TAG_MANAGER_TRACKING_ID

env = env.toLowerCase()
useAuth = useAuth.toLowerCase()
useHttps = useHttps.toLowerCase()
useBrowserSync = useBrowserSync.toLowerCase()

// Promo mode redirects the root to /docs - so our landing page is docs when published on heroku
var promoMode = process.env.PROMO_MODE || 'false'
promoMode = promoMode.toLowerCase()

// Force HTTPS on production. Do this before using basicAuth to avoid
// asking for username/password twice (for `http`, then `https`).
var isSecure = (env === 'production' && useHttps === 'true')
if (isSecure) {
  app.use(utils.forceHttps)
  app.set('trust proxy', 1) // needed for secure cookies on heroku
}

// Ask for username and password on production
if (env === 'production' && useAuth === 'true') {
  app.use(utils.basicAuth(username, password))
}

// Set up App
var appViews = [
  path.join(__dirname, '/node_modules/govuk-frontend/'),
  path.join(__dirname, '/node_modules/govuk-frontend/components'),
  path.join(__dirname, '/app/views/'),
  path.join(__dirname, '/lib/')
]

var nunjucksAppEnv = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
})

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

// Set views engine
app.set('view engine', 'html')

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/assets', express.static(path.join(__dirname, 'node_modules', 'govuk-frontend', 'assets')))

// Serve govuk-frontend in /public
app.use('/node_modules/govuk-frontend', express.static(path.join(__dirname, '/node_modules/govuk-frontend')))
app.use('/node_modules/moment', express.static(path.join(__dirname, '/node_modules/moment')))

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Add global variable to determine if DoNotTrack is enabled.
// This indicates a user has explicitly opted-out of tracking.
// Therefore we can avoid injecting third-party scripts that do not respect this decision.
app.use(function (req, res, next) {
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT
  app.locals.doNotTrackEnabled = (req.header('DNT') === '1')
  next()
})







// Add variables that are available in all views
app.locals.gtmId = gtmId
app.locals.asset_path = '/public/'
app.locals.useAutoStoreData = (useAutoStoreData === 'true')
app.locals.promoMode = promoMode
app.locals.releaseVersion = 'v' + releaseVersion
app.locals.serviceName = config.serviceName
app.locals.todaysDate = config.todaysDate
app.locals.summaryData = config.summaryData
app.locals.agents = config.agents
app.locals.agentTypes = config.agentTypes
app.locals.claimStatuses = config.claimStatuses
app.locals.workCoachClaimStatuses = config.workCoachClaimStatuses
app.locals.debugLoggedInAgentType = config.debugLoggedInAgentType
app.locals.CLAIMS_PER_PAGE = config.CLAIMS_PER_PAGE
app.locals.CLAIM_STATUSES = config.CLAIM_STATUSES

app.locals.now = function () {
  return new Date();
}

// Set the currently used claimant data and the key details bar's data
app.locals.runDataSetup = (data) => {
  // console.log('[server] - runDataSetup() - data: ', data);

  if (typeof data === 'undefined') {
    data = config.outboundClaimantData;
  }

  // Claimant data used to render on pages
  app.locals.currentClaimantData = data;
  
  // Claimant data rendered in the key details bar
  app.locals.currentKeyDetailsData = {
    fullName: `${data.claimant.title} ${data.claimant.firstName} ${data.claimant.lastName}`,
    nino: data.claimant.nino,
    details: [
      {title: 'D.O.B', value: data.claimant.dob},
      {title: 'Postcode', value: data.claimant.address.postcode},
      {title: 'Phone', value: data.claimant.telephone},
      {title: 'Claim submitted (IDOC)', value: data.date}
    ]
  }

  // console.log('[server] - runDataSetup() - current claimant data is: ', data);
};

/*
  1. Agent data
  2. Claimant data
  3. Claim status
*/
app.locals.clearData = () => {
  // console.log('[server] - clearData() - app.locals.CLAIM_STATUSES: ', app.locals.CLAIM_STATUSES);

  // Reset the claimant data to outbound user by default
  app.locals.runDataSetup();

  // CRAZY but this doesn't work! app.locals.claimListData = claimsConfig.data.slice(0, claimsConfig.data.slice.length);
  // READ UP : https://stackoverflow.com/questions/6089058/nodejs-how-to-clone-a-object
  app.locals.claimListData = JSON.parse(JSON.stringify(claimsConfig.data));

  // Reset the agent details if not already 'logged in'
  if (!app.locals.loggedInAgent) {
    app.locals.loggedInAgent = app.locals.agents[0];
  }

  app.locals.claimClosed = false;
  app.locals.selectedClaimStatuses = [{
    date: config.todaysDate.original,
    label: config.claimStatuses[0].label,
    reason: '',
    agent: {
      firstName: app.locals.loggedInAgent.firstName,
      lastName: app.locals.loggedInAgent.lastName
    }
  }];
}

/*
  Set `viewed` flag on the appropriate claim data set
*/
app.locals.markClaimListDatasetViewed = (id) => {
  if (typeof app.locals.claimListData[parseInt(id)] !== 'undefined') {
    app.locals.claimListData[parseInt(id)].viewed = true;
  }
};

app.locals.setClaimStatus = (status, reason) => {  
  // Combine the 2 sets of claim status arrays
  const combinedStatusArray = config.claimStatuses.concat(config.workCoachClaimStatuses);
  const newStatus = combinedStatusArray.find(statusObj => statusObj.value === status);

  if (typeof newStatus !== 'undefined') {
    const now = new Date();

    if (newStatus.label === config.claimStatuses[4].label || newStatus.label === config.claimStatuses[5].label || newStatus.label === config.claimStatuses[6].label) {
      app.locals.claimClosed = true;
    }

    app.locals.selectedClaimStatuses.push({ 
      label: newStatus.label,
      value: newStatus.value,
      reason: reason || '',
      date: now,
      agent: {
        firstName: app.locals.loggedInAgent.firstName,
        lastName: app.locals.loggedInAgent.lastName
      }
    });
  }
}

app.locals.clearData();








// Support session data
app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 4, // 4 hours
    secure: isSecure
  },
  // use random name to avoid clashes with other prototypes
  name: 'govuk-prototype-kit-' + crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false,
  secret: crypto.randomBytes(64).toString('hex')
}))

// Session variable middleware
app.use((req, res, next) => {
  if (req.method === 'GET') {
    const status = req.query.status;
    let claimStatus;

    // Bypass the middleware cycle to instantly pick up the session variable in the templates
    if (typeof req.session.data === 'undefined') {
      req.session.data = {}
    }

    if (typeof status !== 'undefined') {
      claimStatus = status === 'pushed' ? status : 'notPushed' ? status : 'push failed'
    } else {
      claimStatus = req.session.data.claim_status;
    }

    req.session.data.claim_status = claimStatus
  }
  next()
})

// Automatically store all data users enter
if (useAutoStoreData === 'true') {
  app.use(utils.autoStoreData)
  utils.addCheckedFunction(nunjucksAppEnv)
}

// Clear all data in session if you open /prototype-admin/clear-data
app.get('/prototype-admin/clear-data', function (req, res) {
  req.session.destroy();
  app.locals.clearData();
  res.render('prototype-admin/clear-data')
})

// Redirect root to /docs when in promo mode.
if (promoMode === 'true') {
  console.log('Prototype Kit running in promo mode')

  app.get('/', function (req, res) {
    res.redirect('/docs')
  })

  // Allow search engines to index the Prototype Kit promo site
  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nAllow: /')
  })
} else {
  // Prevent search indexing
  app.use(function (req, res, next) {
    // Setting headers stops pages being indexed even if indexed pages link to them.
    res.setHeader('X-Robots-Tag', 'noindex')
    next()
  })

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })
}

const routes = require('./app/routes.js')(app)

// Load routes (found in app/routes.js)
if (typeof (routes) !== 'function') {
  console.log(routes.bind)
  console.log('Warning: the use of bind in routes is deprecated - please check the Prototype Kit documentation for writing routes.')
  routes.bind(app)
} else {
  app.use('/', routes)
}

// Redirect to the zip of the latest release of the Prototype Kit on GitHub
app.get('/prototype-admin/download-latest', function (req, res) {
  var url = utils.getLatestRelease()
  res.redirect(url)
})

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

// Auto render any view that exists

// App folder routes get priority
app.get(/^\/([^.]+)$/, function (req, res) {
  utils.matchRoutes(req, res)
})

// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
app.post(/^\/([^.]+)$/, function (req, res) {
  res.redirect('/' + req.params[0])
})

console.log('\nGOV.UK Prototype Kit v' + releaseVersion)
console.log('\nNOTICE: the kit is for building prototypes, do not use it for production services.')

// Find a free port and start the server
utils.findAvailablePort(app, function (port) {
  console.log('Listening on port ' + port + '   url: http://localhost:' + port)
  if (env === 'production' || useBrowserSync === 'false') {
    app.listen(port)
  } else {
    app.listen(port - 50, function () {
      browserSync({
        proxy: 'localhost:' + (port - 50),
        port: port,
        ui: false,
        files: ['public/**/*.*', 'app/views/**/*.*'],
        ghostmode: false,
        open: false,
        notify: false,
        logLevel: 'error'
      })
    })
  }
})

module.exports = app
