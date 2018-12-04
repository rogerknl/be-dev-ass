const mongoose = require('mongoose');


const PolicySchema = new mongoose.Schema({
  pid: {type: String, unique: true },
  amountInsured: Number,
  email: String,
  inceptionDate: Date,
  installmentPayment: Boolean,
  clientId: { type: String, ref:'User'}
});

const Policy = mongoose.model('Policy',PolicySchema);

module.exports = {Policy};