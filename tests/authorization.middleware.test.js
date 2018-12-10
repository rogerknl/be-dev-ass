const expect = require('chai').expect;
const sinon = require('sinon');

const authorizationMiddleWare = require('../middlewares/authorization')
const { tokenInvalid, tokenUserValid, tokenAdminValid} = require('./seed');

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