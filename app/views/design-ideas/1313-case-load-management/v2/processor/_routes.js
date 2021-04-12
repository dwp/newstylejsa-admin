module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../../../config.js');

  router.get('/', function (req, res) {
    res.redirect('list-claims');
  });

   // routing for service centre agent – agent sign on
   router.post('/change-service-centre', function (req, res) {
    var answer = req.session.data['selectCentre']; 
    res.redirect('/design-ideas/1313-case-load-management/v2/processor/');
  });

  // routing for service centre agent – claim status
  router.post('/claim-status', function (req, res) {
    res.redirect('view-claim?updated=1&allocated=false');
  });

  router.post("/nino-search", function (req, res) {
    const answer = req.session.data['nino']; 
    if (answer === 'allocated') {
      res.redirect(`/design-ideas/1313-case-load-management/v2/processor/view-claim?updated=0&status=allocated`);
    } else {
      res.redirect(`/design-ideas/1313-case-load-management/v2/processor/view-claim?updated=0&status=new`);
    }
  });

  // router.post('/list-claims', function (req, res) {
    
  // });


  return router;
};
