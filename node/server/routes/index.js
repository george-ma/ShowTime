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


		/////////////////////////
    //// * User Routes * ////
		/////////////////////////


		/// Route for creating a new user
    /*
    Request body expects:
    {
    	"username": <username>,
    	"email": <email>,
      "password": <password>
    }
    */
    // Returned JSON is the newly created user document
    // POST /users
    app.post('/users', usersController.create);


		/// Route for creating a new admin
    /*
    Request body expects:
    {
    	"username": <username>,
    	"email": <email>,
      "password": <password>
    }
    */
    // Returned JSON is the newly created user document
    // POST /users/admin
    app.post('/users/admin', usersController.createAdmin);


		/// Route for getting all users
    // Returned JSON list of user documents
    // GET /getAllUsers
    app.get('/users', authenticateAdmin, usersController.getAllUsers);


		/// Route for updating user information
    // Returned JSON is the user document with id
    // GET /users/:id
    app.get('/users/:id', usersController.getUser);


		/// Route for updating user information
    /*
    Request body expects:
    {
    	"username": <username>,
    	"email": <email>,
      "bio": <bio>,
      "img": <img>,
      "password": <password>
    }
    */
    // Returned JSON is the updated user document
    // POST /users/:id/update
    app.post('/users/:id/update', authenticate, usersController.update);


		/// Route for deleting a user
    // Returned JSON is the removed user document
    // GET /users/:id/delete
    app.get('/users/:id/delete', usersController.remove);


		/// Route for logging in user
    /*
    Request body expects:
    {
    	"username": <username>,
      "password": <password>
    }
    */
    // Returned JSON is the logged in user document
    // POST /users/login
    app.post('/users/login', usersController.loginUser);


		/// Route for logging out a user
    // Returned JSON is "success" if logout successful
    // GET /logout
    app.get('/logout', usersController.logoutUser);


		/// Route for adding a show to a user's list of shows
    /*
    Request body expects:
    {
    	"showID": <show's ID>,
    }
    */
    // Returned JSON is the user document, including the new added show
    // POST /users/:id/addshow
    app.post('/users/:id/addshow', authenticate, usersController.addShow);


		/// Route for removing a show from a user's list of shows
    /*
    Request body expects:
    {
    	"showID": <show's ID>,
    }
    */
    // Returned JSON is the user document, with the show in question removed
    // POST /users/:id/removeshow
    app.post('/users/:id/removeshow', authenticate, usersController.removeShow);


		/// Get user's list of shows
    // Returned JSON is a list of show IDs
    // POST /users/:id/getMyShows
    app.get('/users/:id/myshows', authenticate, usersController.getMyShows);


		/// Get list of shows that are not in user's list of shows
    // Returned JSON is a list of show IDs
    // POST /users/:id/notMyShows
    app.get('/users/:id/notmyshows', authenticate, usersController.getNotMyShows);


		/// Checks if show is in user's list of shows
    // Returns true if show is in user's list of shows, else return false
    // GET /users/:id/show/:show_id
    app.get('/users/:id/show/:show_id', usersController.isMyShow);


		/// Route for updating user information for admin. Includes options for
		/// banning user and making the user an admin.
    /*
    Request body expects:
    {
    	"username": <username>,
    	"email": <email>,
      "bio": <bio>,
      "img": <img>,
      "password": <password>,
      "is_banned": <is_banned>,
      "is_admin": <is_admin>
    }
    */
    // Returned JSON is the updated user document
    // POST /users/:id/update/type
		app.post('/users/:id/update/type', authenticateAdmin, usersController.update);


		/////////////////////////
    //// * Show Routes * ////
		/////////////////////////


    // create a new show
    app.post('/shows', authenticate, showsController.create);
    // get all shows
    app.get('/shows/approved', showsController.getApprovedShows);
    // get unapproved shows
    app.get('/shows/unapproved', authenticateAdmin, showsController.getUnapprovedShows);
     // remove show
    // change post request to delete request
    app.post('/shows/remove', authenticateAdmin, showsController.removeShow);
    // approve show
    // TODO: change post request to put request
    app.post('/shows/approve', authenticateAdmin, showsController.approveShow);
		// approve show and delete the template holding new show details
		app.post('/shows/approveAndDelete', authenticateAdmin, showsController.approveAndDeleteShow);
    // get single show based on show id
    app.get('/shows/:id', showsController.getShow);
    // edit show
    app.post('/shows/:id/edit', authenticate, showsController.editShow);


		///////////////////////////
    //// * Rating Routes * ////
		///////////////////////////

    // create a new rating
    app.post('/rating', authenticate, ratingController.create);
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


		///////////////////////////////
    //// * User Check Routes * ////
		///////////////////////////////


		/// Route for getting the current logged in user
    // Returned JSON is the user document
    // GET /getsessionuser
    app.get('/getsessionuser', authenticate, usersController.getSessionUser);
    //check if admin is log in
    app.get('/sessioncheckeradmin', authenticateAdmin, (req, res) => {res.send(true)})

};
