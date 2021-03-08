module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('./config.js');

  // Route index page
  router.get('/', function (req, res) {
    res.render('index');
    req.session.destroy();
  });

  // This moves `contact-centre` routing to `contact-centre` directory
  router.use('/contact-centre', require('./views/contact-centre/_routes')(app));

  // routing for 1752-fraud
  router.use('/design-ideas/1752-fraud', require('./views/design-ideas/1752-fraud/_routes')(app));

  // routing for design ideas 1313 – manager
  router.use('/design-ideas/1313-case-load-management-mvp/service-centre-manager', require('./views/design-ideas/1313-case-load-management-mvp/service-centre-manager/_routes')(app));

  // routing for design ideas 1313 – agent
  router.use('/design-ideas/1313-case-load-management-mvp/service-centre-agent', require('./views/design-ideas/1313-case-load-management-mvp/service-centre-agent/_routes')(app));

  // This moves work coach routing to work-coach directory
  router.use('/work-coach/', require('./views/work-coach/_routes')(app));

  // This moves service centre routing to service-centre directory
  router.use('/service-centre/', require('./views/service-centre/_routes')(app));

  // This moves `common` routing to `common` directory
  router.use('/common', require('./views/common/_routes')(app));
  
  // This moves `error` routing to `error` directory
  router.use('/error', require('./views/error/_routes')(app));

  // Agent login
  router.post('/login', (req, res) => {
    const userType = req.body.login;

    if (typeof userType === 'undefined') {
      res.redirect('/')
    } else {
      app.locals.clearData();

      if (userType === app.locals.agentTypes[0].type) {
        // CONTACT_CENTRE_AGENT
        app.locals.loggedInAgent = app.locals.agents[0];
        app.locals.runDataSetup(config.outboundClaimantData);
        res.redirect('/contact-centre');
      } else if (userType === app.locals.agentTypes[1].type) {
        // CONTACT_CENTRE_MANAGER
        app.locals.loggedInAgent = app.locals.agents[1];
        app.locals.runDataSetup(config.outboundClaimantData);
        res.redirect('/contact-centre');
      } else if (userType === app.locals.agentTypes[2].type) {
        // WORK_COACH_AGENT
        app.locals.loggedInAgent = app.locals.agents[2];
        app.locals.runDataSetup(config.summaryClaimantData);
        res.redirect('/work-coach');
      } else {
        // SERVICE_CENTRE_AGENT
        app.locals.loggedInAgent = app.locals.agents[3];
        app.locals.runDataSetup(config.summaryClaimantData);
        //res.redirect('/common/nino-search');
        res.redirect('/service-centre');
      }
    }
  });

  router.get('/login', (req, res, next) => {
    app.locals.clearData();
    next();
  });

  return router;
}
