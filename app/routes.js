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
  router.use('/design-ideas/1313-case-load-management/v1/service-centre-manager', require('./views/design-ideas/1313-case-load-management/v1/service-centre-manager/_routes')(app));

  // routing for design ideas 1313 – agent
  router.use('/design-ideas/1313-case-load-management/v1/service-centre-agent', require('./views/design-ideas/1313-case-load-management/v1/service-centre-agent/_routes')(app));
  router.use('/design-ideas/1313-case-load-management/v2/service-centre-agent', require('./views/design-ideas/1313-case-load-management/v2/service-centre-agent/_routes')(app));

  router.use('/design-ideas/1313-case-load-management/v2/processor', require('./views/design-ideas/1313-case-load-management/v2/processor/_routes')(app));
  router.use('/design-ideas/1313-case-load-management/v2/allocator', require('./views/design-ideas/1313-case-load-management/v2/allocator/_routes')(app));

  router.use('/future-team/exceptions/backdating/', require('./views/future-team/exceptions/backdating/_routes')(app));
  router.use('/future-team/exceptions/current-work/', require('./views/future-team/exceptions/current-work/_routes')(app));
  router.use('/future-team/exceptions/3-abroad/', require('./views/future-team/exceptions/3-abroad/_routes')(app));
  router.use('/future-team/exceptions/4-backdating-b/', require('./views/future-team/exceptions/4-backdating-b/_routes')(app));
  router.use('/future-team/exceptions/5-nic-pension/', require('./views/future-team/exceptions/5-nic-pension/_routes')(app));
  router.use('/future-team/exceptions/6-esa/', require('./views/future-team/exceptions/6-esa/_routes')(app));

  router.use('/future-team/ur2/1-prior-employment/', require('./views/future-team/ur2/1-prior-employment/_routes')(app));
  router.use('/future-team/ur2/2-nic-pension/', require('./views/future-team/ur2/2-nic-pension/_routes')(app));
  router.use('/future-team/ur2/3-abroad/', require('./views/future-team/ur2/3-abroad/_routes')(app));
  router.use('/future-team/ur2/4-current-work/', require('./views/future-team/ur2/4-current-work/_routes')(app));
  router.use('/future-team/ur2/5-backdating/', require('./views/future-team/ur2/5-backdating/_routes')(app));
  router.use('/future-team/ur2/6-esa/', require('./views/future-team/ur2/6-esa/_routes')(app));

  // IDV with agents
  router.use('/future-team/idv/', require('./views/future-team/idv/_routes')(app));
  router.use('/future-team/idv/v1/', require('./views/future-team/idv/v1/_routes')(app));
  router.use('/future-team/idv/v2/', require('./views/future-team/idv/v2/_routes')(app));


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
