var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

module.exports = {mongoose};