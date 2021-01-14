module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../../config.js');

  // routing for service centre agent – claim status
  router.post('/claim-status', function (req, res) {
    var answer = req.session.data['claimStatus']; 
    if (answer === 'claim-status-brought-forward') {
      res.redirect('claim-brought-forward');
    } else if (answer === 'claim-status-outstanding') {
      res.redirect('claim-outstanding');
    } else if (answer === 'claim-status-refer-to-dm') {
      res.redirect('claim-referred-to-dm');
    } else if (answer === 'claim-status-ttc') {
      res.redirect('claim-transfer-to-clerical');
    } else {
      res.render('design-ideas/1313-case-load-management-mvp/service-centre-agent/claim-cleared');
    }
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
      res.redirect(`/design-ideas/1313-case-load-management-mvp/service-centre-agent/get-next-claim-2`);
    } else {
      // CC agent redirect
      if (app.locals.loggedInAgent === app.locals.agents[0]) {
        res.redirect(`/design-ideas/1313-case-load-management-mvp/service-centre-agent/get-next-claim-1`);

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
