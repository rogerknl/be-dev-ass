const expect = require('chai').expect;
const sinon = require('sinon');

const userCont = require('../controllers/user');
const { usersInDB } = require('./seed');


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
