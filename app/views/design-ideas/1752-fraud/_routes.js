module.exports = (app) => {
  const express = require('express');
  const router = express.Router();

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

    router.post('/single-delete/delete-warning', function (req, res) {

      var answer = req.session.data['sureDelete']; 
      if (answer === 'yes') {
        res.redirect('done');
      } else {
        res.redirect('/design-ideas/1752-fraud/single-delete/customer-statement');
      }
    });

    router.post('/single-delete-warning/delete-warning', function (req, res) {

      var answer = req.session.data['sureDelete']; 
      if (answer === 'yes') {
        res.redirect('done');
      } else {
        res.redirect('/design-ideas/1752-fraud/single-delete-warning/customer-statement');
      }
    });

  return router;
};
