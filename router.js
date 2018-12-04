const authController = require('./controllers/auth');

const authorization = require ('./middlewares/authorization');

module.exports = app => {
  // /*
  //  Endpoints to add
  //   • Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"
  //   • Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
  //   • Get the list of policies linked to a user name -> Can be accessed by users with role "admin"
  //   • Get the user linked to a policy number -> Can be accessed by users with role "admin"
  //
  //   • login
  // */
  
    //Require user or admin access
    app.get('/user/byId/:userId',authorization.requireUserOrAdminAuth, (req,res)=>{res.send('OK')});

    //Require admin access
    app.get('/policy/:username',authorization.requireAdminAuth, (req,res)=>{res.send('OK')});
  

    //signIn
    app.post('/signin', authController.signin);
  };