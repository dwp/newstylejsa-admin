module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const config = require('../../../../config.js');

  // routing for service centre agent – claim status
  router.post('3-abroad/claim-status', function (req, res) {
    res.redirect('done');
  });

  return router;
};
