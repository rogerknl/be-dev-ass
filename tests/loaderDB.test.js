const expect = require('chai').expect;
const sinon = require('sinon');
const nock = require('nock');
const bcrypt = require('bcrypt');



const loaderDB = require('../services/loaderDB')
const { replyUsers, replyPolicies } = require('./seed');


describe("Load DB service", ()=>{
  describe("Request", ()=>{
    it ( "request should call addUsers and addPolicies with the remote data", async () => {
      const isTest = true;
      const scope = nock('http://www.mocky.io')
      .get('/v2/5808862710000087232b75ac')
      .reply(200, replyUsers);
      const scope2 = nock('http://www.mocky.io')
      .get('/v2/580891a4100000e8242b75c5')
      .reply(200, replyPolicies);
  
      let aUStub = sinon.stub(loaderDB, 'addUsers');
      let aPStub = sinon.stub(loaderDB, 'addPolicies');
  
      await loaderDB.request(isTest);
       
      expect(aUStub.callCount).to.equal(1);
      expect(aUStub.firstCall.args[0]).to.eql(replyUsers);
      expect(aPStub.callCount).to.equal(1);
      expect(aPStub.firstCall.args[0]).to.eql(replyPolicies);
      nock.restore();
      aUStub.restore();
      aPStub.restore();
    });
  });
  describe("addUsers",async()=>{
    let mokModel = { create: sinon.spy() }
    beforeEach(()=>{
      mokModel.create.resetHistory();
    });
    it ( "should call User.create as many times as # of clients, with user data", async () => {
      
      await loaderDB.addUsers(replyUsers, mokModel);
      expect(mokModel.create.callCount).to.equal(3);

      expect(mokModel.create.firstCall.args[0].uid).to.equal(replyUsers.clients[0].id);
      expect(mokModel.create.secondCall.args[0].name).to.equal(replyUsers.clients[1].name);
      expect(mokModel.create.secondCall.args[0].role).to.equal(replyUsers.clients[1].role);    
      expect(mokModel.create.thirdCall.args[0].email).to.equal(replyUsers.clients[2].email);
    });
    it ( "should encrypt name and add it as password", async () => {
      await loaderDB.addUsers(replyUsers, mokModel);
      
      const match = await bcrypt.compare(replyUsers.clients[1].name, mokModel.create.secondCall.args[0].password);
      expect(match).to.be.true;
    });
  });
  describe("addPolicies",()=>{
    let mokModel = { create: sinon.spy() }
    beforeEach(()=>{
      mokModel.create.resetHistory();
    });
    it ( "should call Policy.create as many times as # of policies, with plicies data", async () => {
      
      await loaderDB.addPolicies(replyPolicies, mokModel);
      expect(mokModel.create.callCount).to.equal(9);

      expect(mokModel.create.firstCall.args[0].pid).to.equal(replyPolicies.policies[0].id);

      expect(mokModel.create.secondCall.args[0].amountInsured).to.equal(replyPolicies.policies[1].amountInsured);
      expect(mokModel.create.secondCall.args[0].email).to.equal(replyPolicies.policies[1].email);

      expect(mokModel.create.thirdCall.args[0].inceptionDate).to.equal(replyPolicies.policies[2].inceptionDate);
      expect(mokModel.create.thirdCall.args[0].installmentPayment).to.equal(replyPolicies.policies[2].installmentPayment);
      expect(mokModel.create.thirdCall.args[0].clientId).to.equal(replyPolicies.policies[2].clientId);
    });

  });

});
