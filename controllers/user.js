const {User} = require('../models/user');

module.exports.getUserById = async (req, res) => {
  const user = await User.findOne({uid: req.params.userId});
  if (user){
    return res.status(200).send({
      id: user.uid,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } 
  return res.status(404).send('User not found');
};


module.exports.getUserByUsername = async ( req, res) => {
  const user = await User.findOne({ name: req.params.username });
  if (user){
    return res.status(200).send({
      id: user.uid,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } 
  return res.status(404).send('User not found');
};