//File used for load mongoose db with api service

const fetch = require('node-fetch');
const {User} = require('../models/user');
const {Policy} = require('../models/policy');
const bcrypt = require('bcrypt');

require('dotenv').config({ path: __dirname +'/../.env' });


const  {mongoose} = require('../db/mongoose');

//drop all collections



const addUsers = async (json) => {
  const salt = 10;
  for ( let i=0; i<json.clients.length; i++) {
    json.clients[i].password = await bcrypt.hash(json.clients[i].name,salt)
    await User.create({
      uid: json.clients[i].id,
      name: json.clients[i].name,
      email: json.clients[i].email,
      role: json.clients[i].role,
      password: json.clients[i].password
    });
  }
}
const addPolicies = async (json) => {
  for ( let i=0; i< json.policies.length; i++) {
    await Policy.create({
      pid: json.policies[i].id,
      amountInsured: json.policies[i].amountInsured,
      email: json.policies[i].email,
      inceptionDate: json.policies[i].inceptionDate,
      installmentPayment: json.policies[i].installmentPayment,
      clientId: json.policies[i].clientId
    });
  }
}


const request = async () => {

  await User.collection.deleteMany({}, function(err) { 
  });
  await Policy.collection.deleteMany({}, function(err) { 
  });

  
  let response = await fetch("http://www.mocky.io/v2/5808862710000087232b75ac");
  let json = await response.json();
  await addUsers(json);
  
  response = await fetch("http://www.mocky.io/v2/580891a4100000e8242b75c5");
  json = await response.json();
  await addPolicies(json);
  mongoose.connection.close();
  
}
request();
