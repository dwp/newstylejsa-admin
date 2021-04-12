module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../../../config.js');

  router.get('service-centre-agent', function (req, res) {
    console.log('got');
  });

   // routing for service centre agent – agent sign on
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
      res.render('design-ideas/1313-case-load-management/v2/service-centre-agent/index');
    }
  });

  // routing for service centre agent – claim status
  router.post('/claim-status', function (req, res) {
    res.redirect('done');
  });

  router.post("/nino-search", function (req, res) {
    res.redirect(`/design-ideas/1313-case-load-management/v2/service-centre-agent/view-claim`);
  });
  return router;
};
