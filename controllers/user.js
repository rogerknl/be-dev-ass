const {User} = require('../models/user');

module.exports.getUserById = async (req, res) => {
  const user = await User.findOne({uid: req.params.userId});
  if (user){
    res.status(200);
    return res.send({
      id: user.uid,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } 
  res.status(404)
  return res.send('User not found');
};


module.exports.getUserByUsername = async ( req, res) => {
  const user = await User.findOne({ name: req.params.username });
  if (user){
    res.status(200);
    return res.send({
      id: user.uid,
      name: user.name,
      email: user.email,
      role: user.role
    });
  }
  res.status(404);
  return res.send('User not found');
};