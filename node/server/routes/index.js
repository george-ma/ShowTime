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
  app.post('/users', usersController.create);
  // GET all users
  app.get('/users', usersController.getAllUsers);
  // get user by id
  app.get('/users/:id', usersController.getUser);




};
