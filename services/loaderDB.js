//File used for load mongoose db with api service

const fetch = require('node-fetch');
const {User} = require('../models/user');
const {Policy} = require('../models/policy');
const bcrypt = require('bcrypt');

require('dotenv').config({ path: __dirname +'/../.env' });


let mongoose;
const loaderDB = {};

loaderDB.addUsers = async (json, u = User) => {
  const salt = 10;
  for ( let i=0; i<json.clients.length; i++) {
    json.clients[i].password = await bcrypt.hash(json.clients[i].name,salt)
    await u.create({
      uid: json.clients[i].id,
      name: json.clients[i].name,
      email: json.clients[i].email,
      role: json.clients[i].role,
      password: json.clients[i].password
    });
  }
}
         
loaderDB.addPolicies = async (json, p = Policy) => {
  for ( let i=0; i< json.policies.length; i++) {
    await p.create({
      pid: json.policies[i].id,
      amountInsured: json.policies[i].amountInsured,
      email: json.policies[i].email,
      inceptionDate: json.policies[i].inceptionDate,
      installmentPayment: json.policies[i].installmentPayment,
      clientId: json.policies[i].clientId
    });
  }
}

loaderDB.request = async ( isTest = false, u = User, p = Policy  ) => {
  if (!isTest){
    mongoose = require('../db/mongoose').mongoose;
  }
  await u.collection.deleteMany({}, function(err) { });
  await p.collection.deleteMany({}, function(err) { });
  
  let response = await fetch("http://www.mocky.io/v2/5808862710000087232b75ac");
  let json = await response.json();
  await loaderDB.addUsers(json);
  
  response = await fetch("http://www.mocky.io/v2/580891a4100000e8242b75c5");
  json = await response.json();
  await loaderDB.addPolicies(json);

  if (!isTest){
    mongoose.connection.close();
  }
}


module.exports = loaderDB;