const jwt = require('jsonwebtoken');

// function for check if user is authenticated
module.exports = () => (req, res, next) => {
  console.log(req.body);
  // get token
  const token = req.body.token || req.query.token || req.session.token || req.get('x-access-token');
  if(!token) {
    const err = new Error('no token provided');
    next(err);
    return;
  }

  // Verify is a real token and is not modified
  jwt.verify(token, process.env.JWT_SECRET, function (err, tokenDecoded) {
    if(err){
      next(err);
      return;
    }
    req.authUser = tokenDecoded._id;
    next();
  })
};