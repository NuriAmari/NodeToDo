var express = require('express');
var router = express.Router();
var passport = require('passport');
var Task = require('../models/task');

/* GET home page. */
router.get('/', function(req, res, next) {
  var messages = req.flash('error');
  res.render('signup', { title: 'Express', messages: messages, hasErrors: messages.length > 0 });
});

router.get('/home/:userEmail', function(req, res, next) {
  console.log(req.user.email);
  Task.find({userEmail: req.user.email}, function(err, docs) {
    if (err) throw err;
    res.render('index', {userEmail: req.user.email, data: docs, length: docs.length});
  });
});

router.delete('/home/:userEmail/delete/:taskId', function(req, res, next) {
  Task.deleteOne({_id: req.params.taskId}, function (err) {
    if (err) throw err;
    res.redirect(303, '/home/' + req.params.userEmail);
    res.end();
  });
});

router.post('/home/:userEmail/newItem', function(req, res, next) {
  console.log("hello");
  var newTask = new Task();
  newTask.title = req.body.task;
  newTask.userEmail = req.params.userEmail;
  newTask.save(function(err) {
    if (err) {
      throw err;
    }
    res.redirect('/home/' + newTask.userEmail);
    res.end();
  });
})

router.post('/', passport.authenticate('local-signup', {failureRedirect: '/', failureFlash: true}),
 function(req, res) {
  console.log(req);
  res.redirect('/home/' + req.user.email);
  res.end();
});

module.exports = router;
