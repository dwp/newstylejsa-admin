module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../config.js');

  // routing for service centre agent – claim status
  router.post('/workflow', function (req, res) {
    var data = req.session.data;

    if (data.workflow == 'bio-check-claims') {
      // BIO
      res.redirect('1a/?claimStatus=ID not verified');
    } else if (data.workflow == 'suspected-fraud-claims') {
      // SCOLA
      res.redirect('1b/?claimStatus=third fail');
    } else {
      // Greenock
      res.redirect('2b/?claimStatus=third fail');
    }
  });

  return router;
};
