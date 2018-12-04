const {User} = require('../models/user');
const {Policy} = require('../models/policy');


module.exports.getPolicyByUsername = async (req, res) => {
  const user = await User.findOne({ name: req.params.username });
  if (user){
    const policies = await Policy.find({clientId: user.uid},{'_id': 0, '__v':0});
    return res.status(200).send({policies});
  } 
  return res.status(404).send('User not found');
};


module.exports.getUserLinkedToPolicy = async ( req, res) => {
  const policy = await Policy.findOne({ pid: req.params.poicyId });
  if (policy){
    const user = await User.findOne({ uid: policy.clientId});
    if (user){
      return res.status(200).send({
        id: user.uid,
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
    return res.status(404).send('User not found');
  } 
  return res.status(404).send('Policy not found');
};
