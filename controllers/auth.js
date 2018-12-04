const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({name: username});
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if ( match ){
      let token = jwt.sign({ userId: user.uid }, process.env.SECRETJWT);
      return res.status(200).send({token});
    }
  }
  return res.status(401).send('Invalid Credentials');
};