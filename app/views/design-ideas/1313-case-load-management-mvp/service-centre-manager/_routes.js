module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../../config.js');

    // routing for service centre manager – manager sign on
    router.post('/select-service-centre', function (req, res) {
      var answer = req.session.data['selectCentre']; 
      if (answer === 'leeds-100101') {
        res.redirect('index');
      } else if (answer === 'preston-132141') {
        res.redirect('index');
      } else if (answer === 'dumfries-456789') {
        res.redirect('index');
      } else if (answer === 'liverpool-243654') {
        res.redirect('index');
      } else if (answer === 'galashiels-987321') {
        res.redirect('index');
      } else if (answer === 'cardiff-211201') {
        res.redirect('index');
      } else {
        res.render('design-ideas/1313-case-load-management-mvp/service-centre-manager/index');
      }
    });

  // routing for service centre manager – alternative centre
  router.post('/select-service-centre', function (req, res) {
    var answer = req.session.data['selectAlternativeCentre']; 
    if (answer === 'leeds-100101') {
      res.redirect('centres/centre-update-leeds');
    } else if (answer === 'preston-132141') {
      res.redirect('centres/centre-update-preston');
    } else if (answer === 'dumfries-456789') {
      res.redirect('centres/centre-update-dumfries');
    } else if (answer === 'liverpool-243654') {
      res.redirect('centres/centre-update-liverpool');
    } else if (answer === 'galashiels-987321') {
      res.redirect('centres/centre-update-galashiels');
    } else if (answer === 'cardiff-211201') {
      res.redirect('centres/centre-update-cardiff');
    } else {
      res.render('design-ideas/1313-case-load-management-mvp/service-centre-manager/centres/centre-update-southampton');
    }
  });

  // routing for service centre manager – alternative agent
  router.post('/select-agent', function (req, res) {
    var answer = req.session.data['selectAgent']; 
    if (answer === 'andrew-server') {
      res.redirect('agents/agent-update-andrew');
    } else if (answer === 'ted-hughes') {
      res.redirect('agents/agent-update-ted');
    } else if (answer === 'miguel-indurain') {
      res.redirect('agents/agent-update-miguel');
    } else if (answer === 'neil-simons') {
      res.redirect('agents/agent-update-neil');
    } else if (answer === 'jane-macdonald') {
      res.redirect('agents/agent-update-jane');
    } else if (answer === 'bart-blokk') {
      res.redirect('agents/agent-update-bart');
    } else if (answer === 'sylvia-plath') {
      res.redirect('agents/agent-update-sylvia');
    } else if (answer === 'gareth-thomas') {
      res.redirect('agents/agent-update-gareth');
    } else if (answer === 'john-hardcastle') {
      res.redirect('agents/agent-update-john');
    } else if (answer === 'femi-johns') {
      res.redirect('agents/agent-update-femi');
    } else if (answer === 'nadia-khomani') {
      res.redirect('agents/agent-update-nadia');
    } else {
      res.render('design-ideas/1313-case-load-management-mvp/service-centre-manager/agents/agent-update-olivia');
    }
  });

    // NiNo search
    router.get("/nino-search", function (req, res) {
      req.session.data.show = undefined;
      req.next();
    });
  
    router.post("/nino-search", function (req, res) {
      const answer = req.body.nino;
  
      // nino invalid
      if (answer === "invalid") {
        res.redirect(`${ABS_BASE_PATH}/nino-search?show=invalid`);
  
        // duplicate claim
      } else if (answer === "duplicate") {
        res.redirect(`${ABS_BASE_PATH}/duplicate`);
  
        // SC allocated claim
      } else if (answer === "allocated") {
        res.redirect(`/service-centre/allocated-claim`);
  
        // WC incompatible benefit
      } else if (answer === "incompatible") {
        res.redirect(`${ABS_BASE_PATH}/claim?view=incompatible`);
  
        // WC CIS error
      } else if (answer === "cis") {
        res.redirect(`${ABS_BASE_PATH}/claim?push=cisError`);
  
        // nino not found
      } else if (!answer.length) {
        res.redirect(`/design-ideas/1313-case-load-management-mvp/service-centre-manager/get-next-claim-3-notification`);
      } else {
        // CC agent redirect
        if (app.locals.loggedInAgent === app.locals.agents[0]) {
          res.redirect(`/design-ideas/1313-case-load-management-mvp/service-centre-manager/get-next-claim-2`);
  
          // CC manager redirect
        } else if (app.locals.loggedInAgent === app.locals.agents[1]) {
          res.redirect(`${ABS_BASE_PATH}/customer-statement`);
  
          // All redirect if other value
        } else {
          res.redirect(`${ABS_BASE_PATH}/claim`);
        }
      }
    });
    
  return router;
};
