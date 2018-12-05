const {User} = require('../models/user');
const {Policy} = require('../models/policy');


module.exports.getPolicyByUsername = async (req, res) => {
  const user = await User.findOne({ name: req.params.username });
  if (user){
    const policies = await Policy.find({clientId: user.uid},{'_id': 0, '__v':0});
    res.status(200);
    return res.send({policies});
  } 
  res.status(404);
  return res.send('User not found');
};


module.exports.getUserLinkedToPolicy = async ( req, res) => {
  const policy = await Policy.findOne({ pid: req.params.poicyId });
  if (policy){
    const user = await User.findOne({ uid: policy.clientId});
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
  } 
  res.status(404);
  return res.send('Policy not found');
};
