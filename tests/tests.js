const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('dotenv').config();

const { usersInDB, policyInDB } = require('./seed');

const {User} = require('../models/user');
const {Policy} = require('../models/policy');





describe("app and service",()=>{
  before(function(done) {
    this.timeout(10000);
    mongoose.connect(process.env.TEST_MONGODB, { useNewUrlParser: true })
    .then(() => {
      done();
    })
    .catch(err => console.log(err));
    mongoose.set('useCreateIndex', true);
  });
  after(function() {
    mongoose.connection.close();
  });

  describe("Service Load", () => {
    require ('./loaderDB.test.js');

  });
  describe("Controllers and Middleware", () => {
    before(function (done) {
      this.timeout(10000);
      User.collection.deleteMany({}, function(err) {
        User.insertMany(usersInDB).catch(e=>{ console.log (e)});
        done();
      });
      
    });
    before(function(done) {
      this.timeout(10000);
      Policy.collection.deleteMany({}, function(err) { 
        Policy.insertMany(policyInDB);
        done();
      });
    });
    
    require ('./auth.controller.test.js');
    require ('./user.controller.test.js');
    require ('./policy.controller.test.js');
    require ('./authorization.middleware.test.js');
  });

})




