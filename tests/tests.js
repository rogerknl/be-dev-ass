const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('dotenv').config();

const {  usersInDB, policyInDB,numPoliciesMerrill, numPoliciesBritney, tokenInvalid, tokenUserValid, tokenAdminValid} = require('./seed');
const authCont = require('../controllers/auth');
const userCont = require('../controllers/user');
const policyCont = require('../controllers/policy')
const authorizationMiddleWare = require('../middlewares/authorization')

//befor test connect to db
before(function(done) {
  mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => {
    done();
  })
  .catch(err => console.log(err));
  mongoose.set('useCreateIndex', true);
});
after(function() {
  mongoose.connection.close();
});

describe ("Authentication Controller",()=>{
  describe("login", ()=>{
    it("should return 401 if invalid credentials", async ()=>{
      let req = {
        body:  { username: usersInDB[0].name + '1', password: usersInDB[0].password }
      };
      let res = { send: sinon.spy(), status: sinon.spy() };
      await authCont.signin(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(401);
      expect(res.send.firstCall.args[0]).to.be.equal('Invalid Credentials');
    });
    it("should return status 200 and token if valid credentials", async ()=>{
      let req = {
        body:  { username: usersInDB[0].name, password: usersInDB[0].password }
      };
      let res = { send: sinon.spy(), status: sinon.spy() };
      await authCont.signin(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(200);
      expect(res.send.firstCall.args[0].token).to.exist;
    });
  });
});
describe ("User/Client Controller",()=>{
  describe("get user by user Id", ()=>{
    it("should return 404 if uid not found", async ()=>{
      let req = { params: { userId :  usersInDB[0].uid+1 } }
      let res = { send: sinon.spy(), status: sinon.spy() };
  
      await userCont.getUserById(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(404);
      expect(res.send.firstCall.args[0]).to.be.equal('User not found');
    });
    it("should return 200 and user data  if uid exist in DB", async ()=>{
      let req = { params: { userId : usersInDB[1].uid } }
      
      let res = { send: sinon.spy(), status: sinon.spy() };
      await userCont.getUserById(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(200);
      expect(res.send.firstCall.args[0].id).to.be.equal(usersInDB[1].uid);
      expect(res.send.firstCall.args[0].name).to.be.equal(usersInDB[1].name);
      expect(res.send.firstCall.args[0].email).to.be.equal(usersInDB[1].email);
      expect(res.send.firstCall.args[0].role).to.be.equal(usersInDB[1].role);
    });
  });
  
  describe("get user by username", ()=>{
    it("should return 404 if uid not found", async ()=>{
      let req = { params: { username :  usersInDB[0].name+1 } }
      let res = { send: sinon.spy(), status: sinon.spy() };
  
      await userCont.getUserByUsername(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(404);
      expect(res.send.firstCall.args[0]).to.be.equal('User not found');
    });
    it("should return 200 and user data  if uid exist in DB", async ()=>{
      let req = { params: { username : usersInDB[1].name } }
      
      let res = { send: sinon.spy(), status: sinon.spy() };
      await userCont.getUserByUsername(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(200);
      expect(res.send.firstCall.args[0].id).to.be.equal(usersInDB[1].uid);
      expect(res.send.firstCall.args[0].name).to.be.equal(usersInDB[1].name);
      expect(res.send.firstCall.args[0].email).to.be.equal(usersInDB[1].email);
      expect(res.send.firstCall.args[0].role).to.be.equal(usersInDB[1].role);
    });
  });
});

describe ("Policy Controller",()=>{
  describe("get policies by username", ()=>{
    it("should return 404 if username not found", async ()=>{
      let req = { params: { username :  usersInDB[0].name+1 } }
      let res = { send: sinon.spy(), status: sinon.spy() };
  
      await policyCont.getPolicyByUsername(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(404);
      expect(res.send.firstCall.args[0]).to.be.equal('User not found');
    });
    it("should return 200 and all policies associated to a username", async ()=>{
      let req = { params: { username :  usersInDB[0].name } }
      let res = { send: sinon.spy(), status: sinon.spy() };
  
      await policyCont.getPolicyByUsername(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(200);
      expect(res.send.firstCall.args[0].policies).to.exist;
      expect(res.send.firstCall.args[0].policies.length).to.equal(numPoliciesMerrill);
      
      req.params.username = usersInDB[1].name;
      await policyCont.getPolicyByUsername(req,res);
      expect(res.status.secondCall.args[0]).to.be.equal(200);
      expect(res.send.secondCall.args[0].policies).to.exist;
      expect(res.send.secondCall.args[0].policies.length).to.equal(numPoliciesBritney);
    });
  });
  describe("get user linked to policy", ()=>{
    it("should return 404 if pid not found", async ()=>{
      let req = { params: { poicyId :  policyInDB.pid+1 } }
      let res = { send: sinon.spy(), status: sinon.spy() };
  
      await policyCont.getUserLinkedToPolicy(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(404);
      expect(res.send.firstCall.args[0]).to.be.equal('Policy not found');
    });

    it("should return 200 and user data if uid exist in DB", async ()=>{
      let req = { params: { poicyId :  policyInDB.pid } }
      let res = { send: sinon.spy(), status: sinon.spy() };
      
      await policyCont.getUserLinkedToPolicy(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(200);
      expect(res.send.firstCall.args[0].id).to.be.equal(usersInDB[2].uid);
      expect(res.send.firstCall.args[0].name).to.be.equal(usersInDB[2].name);
      expect(res.send.firstCall.args[0].email).to.be.equal(usersInDB[2].email);
      expect(res.send.firstCall.args[0].role).to.be.equal(usersInDB[2].role);
    });
  });
});
describe("Authorization middleware", ()=>{
  describe("Require User Or Admin Role",()=>{
    it("if no token should return status 401 and msg Invalid token, next not called",async ()=>{
      let req = { header: (head)=> {return ""} }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireUserOrAdminAuth(req,res,next);
      expect(res.status.firstCall.args[0]).to.be.equal(401);
      expect(res.send.firstCall.args[0]).to.be.equal('Invalid token');
      expect(next.callCount).to.be.equal(0);
    });
    it("if token invalid should return status 401 and msg Invalid token, next not called",async ()=>{
      let req = { header: (head)=> {return "Bearer "+ tokenInvalid} }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireUserOrAdminAuth(req,res,next);
      expect(res.status.firstCall.args[0]).to.be.equal(401);
      expect(res.send.firstCall.args[0]).to.be.equal('Invalid token');
      expect(next.callCount).to.be.equal(0);
    });
    it("if token is User valid should call next",async ()=>{
      let req = { header: (head)=> {return "Bearer "+ tokenUserValid } }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireUserOrAdminAuth(req,res,next);
      expect(next.callCount).to.be.equal(1);
    });
    it("if token is Admin valid should call next",async ()=>{
      let req = { header: (head)=> {return "Bearer "+ tokenAdminValid } }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireUserOrAdminAuth(req,res,next);
      expect(next.callCount).to.be.equal(1);
    });
  });

  describe("Require Admin Role",()=>{
    it("if no token should return status 401 and msg Invalid token, next not called",async ()=>{
      let req = { header: (head)=> {return ""} }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireAdminAuth(req,res,next);
      expect(res.status.firstCall.args[0]).to.be.equal(401);
      expect(res.send.firstCall.args[0]).to.be.equal('Invalid token');
      expect(next.callCount).to.be.equal(0);
    });
    it("if token invalid should return status 401 and msg Invalid token, next not called",async ()=>{
      let req = { header: (head)=> {return "Bearer "+ tokenInvalid} }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireAdminAuth(req,res,next);
      expect(res.status.firstCall.args[0]).to.be.equal(401);
      expect(res.send.firstCall.args[0]).to.be.equal('Invalid token');
      expect(next.callCount).to.be.equal(0);
    });
    it("if token is User valid should return status 401 and msg  token, next not called",async ()=>{
      let req = { header: (head)=> {return "Bearer "+ tokenUserValid } }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireAdminAuth(req,res,next);
      expect(res.send.firstCall.args[0]).to.be.equal('Role Unauthorized');
      expect(next.callCount).to.be.equal(0);
    });
    it("if token is Admin valid should call next",async ()=>{
      let req = { header: (head)=> {return "Bearer "+ tokenAdminValid } }
      let res = { send: sinon.spy(), status: sinon.spy() };
      let next = sinon.spy();
      await authorizationMiddleWare.requireAdminAuth(req,res,next);
      expect(next.callCount).to.be.equal(1);
    });
  });
});
