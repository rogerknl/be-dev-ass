const {User} = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports.requireUserOrAdminAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (req.header('Authorization')){
    const authHeader = req.header('Authorization').split(" ");
    if ( authHeader[0]=="Bearer" ){
      try {
        var decoded = jwt.verify(authHeader[1], process.env.SECRETJWT);
        const user = await User.findOne({ uid: decoded.userId });
        if ( user.role == "user" || user.role == "admin" ){
          return next();
        }
      } catch(err){
        //console.log(err)
      }
    }
  }
  res.status(401);
  return res.send('Invalid token')
}

module.exports.requireAdminAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (req.header('Authorization')){
    const authHeader = req.header('Authorization').split(" ");
    if ( authHeader[0]=="Bearer" ){
      try {
        var decoded = jwt.verify(authHeader[1], process.env.SECRETJWT);
        const user = await User.findOne({ uid: decoded.userId });
        if ( user.role == "admin" ){
          return next();
        } 
        res.status(401)
        return res.send('Role Unauthorized')
      } catch(err){

      }
    }
  }
  res.status(401)
  return res.send('Invalid token')
}