const usersController = require('../controllers').user;
const showsController = require('../controllers').show;
const ratingController = require('../controllers').rating;

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
    // create new admins
    app.post('/users/admin', usersController.createAdmin);
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
     // remove show
    // TODO: change post request to delete request
    app.post('/shows/remove', showsController.removeShow);
    // approve show
    // TODO: change post request to put request
    app.post('/shows/approve', showsController.approveShow);
    // get single show based on show id
    app.get('/shows/:id', showsController.getShow);
    // edit show
    app.post('/shows/:id/edit', showsController.editShow);

    // * rating routes *
    // create a new rating
    app.post('/rating', ratingController.create);
    // get all ratings
    app.get('/rating', ratingController.getAllRatings);
    // get avrage rating for show
    app.get('/rating/avg/:show_id', ratingController.getAvgRating);
    // get number of status for a show
    app.get('/rating/status/:show_id', ratingController.numberofStatus);
    // get reviews for this show
    app.get('/rating/review/:show_id', ratingController.getReviews);

};
