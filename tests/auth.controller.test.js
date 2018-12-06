const expect = require('chai').expect;
const sinon = require('sinon');

const authCont = require('../controllers/auth');
const {  usersInDB } = require('./seed');


describe ("Authentication Controller",()=>{
  describe("login", ()=>{
    it("should return 401 if invalid credentials", async()=>{
      let req = {
        body:  { username: usersInDB[0].name + '1', password: usersInDB[0].name } //usersInDB[0].name is password without cypher
      };
      let res = { send: sinon.spy(), status: sinon.spy() };
      await authCont.signin(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(401);
      expect(res.send.firstCall.args[0]).to.be.equal('Invalid Credentials');
    });
    it("should return status 200 and token if valid credentials", async ()=>{
      let req = {
        body:  { username: usersInDB[0].name, password: usersInDB[0].name } //usersInDB[0].name is password without cypher
      };
      let res = { send: sinon.spy(), status: sinon.spy() };
      await authCont.signin(req,res);
      expect(res.status.firstCall.args[0]).to.be.equal(200);
      expect(res.send.firstCall.args[0].token).to.exist;
    });
  });
});