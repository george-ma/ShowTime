const usersController = require('../controllers').user;
const showsController = require('../controllers').show;

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
    // update user by id
    app.post('/users/:id/update', usersController.update);
    // remove user by id
    app.get('/users/:id/delete', usersController.remove);
    // login a user
    app.post('/users/login', usersController.loginUser);
    // add show to user's list of shows
    app.post('/users/:id/addshow', usersController.addShow);
    // removes show from user's list of shows
    app.post('/users/:id/removeshow', usersController.removeShow);
    // get user's shows
    app.get('/users/:id/myshows', usersController.getMyShows);
    // get not user's shows
    app.get('/users/:id/notmyshows', usersController.getNotMyShows);

    // * show routes *
    // create a new show
    app.post('/shows', showsController.create);
    // get all shows
    app.get('/shows/approved', showsController.getApprovedShows);
    // get unapproved shows
    app.get('/shows/unapproved', showsController.getUnapprovedShows);



};
