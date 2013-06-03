
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Register user' });
};

/*
 * POST home page.
 */

exports.post = function(req, res){
  res.render('index', { title: 'Register user - Result', posts: req.body });
};