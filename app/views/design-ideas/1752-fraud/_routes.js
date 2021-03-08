module.exports = (app) => {
  const express = require('express');
  const router = express.Router();

  
   // routing for 
   router.post('/bulk-delete/uploaded', function (req, res) {
    var answer = req.session.data['sureDelete']; 
    if (answer === 'yes') {
      res.redirect('done');
    } else {
      res.redirect('/design-ideas/1752-fraud/bulk-delete');
    }
  });

  router.post('/bulk-delete/check', function (req, res) {
   var answer = req.session.data['sureUse']; 
   if (answer === 'yes') {
     res.redirect('uploaded');
   } else {
     res.redirect('/design-ideas/1752-fraud/bulk-delete/upload');
   }
 });

  return router;
};
