const authController = require('./controllers/auth');
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


    //signIn
    app.post('/signin', authController.signin);
  };