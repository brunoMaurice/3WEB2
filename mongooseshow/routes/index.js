
/*
 * GET home page.
 */

exports.index = function(req, res){
  var User  = require('./../models/userModel.js').User;
  var query = User.find();

  query.exec(function(error, users) {
    res.render('index', { title: 'Show user', users: users });
  });
};

exports.register = function(req, res){
  res.render('register', { title: 'Register user' });
};

/*
 * POST home page.
 */

exports.post = function(req, res){
  var crypto = require('crypto');
  var User  = require('./../models/userModel.js').User;

  // On utilise le module crypto pour hash en sha1 le password
  var shasum = crypto.createHash('sha1');
  shasum.update(req.body.password);

  var newuser  = new User({
    "username": req.body.username,
    "password": shasum.digest('hex')
  });

  newuser.save(function (error, user) {
    if (error) { 
      res.redirect('/register');
    } else { 
      console.log('User "' + user.username + '"  added!');
      res.redirect('/');
    }
  });
};