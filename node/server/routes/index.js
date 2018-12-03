const usersController = require('../controllers').user;
const showsController = require('../controllers').show;
const ratingController = require('../controllers').rating;

const User = require('../models/user').User
const Show = require('../models/show').Show
const { Rating } = require('../models/rating')
const { ObjectID } = require('mongodb')

// Authentication for user resource routes
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user || user.is_banned) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send()
		})
	} else {
		res.status(401).send()
	}
}

// Authentication for user resource routes
const authenticateAdmin = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user || !user.is_admin) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send()
		})
	} else {
		res.status(401).send()
	}
}

module.exports = (app) => {
    app.use((req, res, next)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
        res.header('Access-Control-Allow-Credentials',' true');
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
    // login out a user
    app.get('/logout', usersController.logoutUser);
    // add show to user's list of shows
    app.post('/users/:id/addshow', authenticate, usersController.addShow);
    // removes show from user's list of shows
    app.post('/users/:id/removeshow', usersController.removeShow);
    // get user's shows
    app.get('/users/:id/myshows', usersController.getMyShows);
    // get not user's shows
    app.get('/users/:id/notmyshows', usersController.getNotMyShows);
    // get user's shows
    app.get('/users/:id/show/:show_id', usersController.isMyShow);

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
    app.post('/shows/:id/edit', authenticate, showsController.editShow);

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
    // get my rating data for a show
    app.get('/rating/user/:user_id/:show_id', ratingController.getMyRating);

    // User Check routes
    //get current logged in user
    app.get('/getsessionuser', authenticate, usersController.getSessionUser);
    //check if admin is log in
    app.get('/sessioncheckeradmin', authenticateAdmin, (req, res) => {res.send(true)})

};
