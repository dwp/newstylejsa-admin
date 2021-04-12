module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../../../config.js');

  router.get('/', function (req, res) {
    res.redirect('list-claims');
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
    res.redirect('view-claim?updated=true&allocated=false');
  });

  router.post("/nino-search", function (req, res) {
    res.redirect(`/design-ideas/1313-case-load-management/v2/allocator/view-claim`);
  });

  router.post("/select-agent", function (req, res) {
    res.redirect(`/design-ideas/1313-case-load-management/v2/allocator/view-claim?updated=true&allocated=false`);
  });

  return router;
};
