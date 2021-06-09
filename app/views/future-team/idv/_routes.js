module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../config.js');

  // routing for service centre agent – claim status
  router.post('/workflow', function (req, res) {
    res.redirect('v1/?claimStatus=ID not verified');
  });

  return router;
};
