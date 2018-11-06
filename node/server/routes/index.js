const usersController = require('../controllers').user;

module.exports = (app) => {
  app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
  });
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Project Collab API!',
  }));

  // * user routes *
  // create new users
  app.post('/api/users', usersController.create);
  // update a single usesr
  app.post('/api/user/update', usersController.update);
  // get all users
  app.get('/api/users', usersController.list);
  // get a single user info TODO
  app.get('/api/users/:user', usersController.getUser);
  // remove a single user TODO
  app.post('/api/user/remove', usersController.removeUser);
  // * sign-up routes *




};
