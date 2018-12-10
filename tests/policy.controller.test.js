const expect = require('chai').expect;
const sinon = require('sinon');


const policyCont = require('../controllers/policy');
const {  usersInDB, policyInDB,numPoliciesMerrill, numPoliciesBritney } = require('./seed');


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
      let req = { params: { poicyId :  policyInDB[0].pid+1 } }
      let res = { send: sinon.spy(), status: sinon.spy() };
  
      await policyCont.getUserLinkedToPolicy(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(404);
      expect(res.send.firstCall.args[0]).to.be.equal('Policy not found');
    });

    it("should return 200 and user data if uid exist in DB", async ()=>{
      let req = { params: { poicyId :  policyInDB[0].pid } }
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