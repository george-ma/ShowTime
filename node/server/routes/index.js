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


		/// Route for creating a new show
    /*
    Request body expects:
    {
      "title": <show title>,
      "description": <show description>,
      "airDate": <show's air date>,
      "img": <display image for show>,
      "link": <link to show online>,
      "airInterval": <number of days between new episode release>,
      "approved": <if show is approved>,
      "updating": <id of show it will replace once approved>
    }
    */
    // Returned JSON is the newly created show document
    // POST /shows
    app.post('/shows', authenticate, showsController.create);


		/// Route for getting all approved shows
    // Returned JSON is an array of approved shows
    // GET /shows/approved
    app.get('/shows/approved', showsController.getApprovedShows);


		/// Route for getting all unapproved shows
    // Returned JSON is an array of unapproved shows
    // GET /shows/unapproved
    app.get('/shows/unapproved', authenticateAdmin, showsController.getUnapprovedShows);


		/// Route for removing a show
    /*
    Request body expects:
    {
      "showId": <show ID>
    }
    */
    // Returned JSON is removed show document
    // POST /shows/remove
    app.post('/shows/remove', authenticateAdmin, showsController.removeShow);


		/// Route for changing a show's status to approved (show.approved = true)
    /*
    Request body expects:
    {
      "showId": <show ID>
    }
    */
    // Returned JSON is approved show document
    // POST /shows/approve
    app.post('/shows/approve', authenticateAdmin, showsController.approveShow);


		/// Route for approving a show and deleting the copy holding information
		/// to be copied into the approved show. The show ID here refers to the
		/// show whose information we want to copy into the approved show, which is
		/// also the unapproved copy that we want to delete.
    /*
    Request body expects:
    {
      "showId": <show ID>
    }
    */
    // Returned JSON is approved show document
    // POST /shows/approveAndDelete
		app.post('/shows/approveAndDelete', authenticateAdmin, showsController.approveAndDeleteShow);


		/// Route for getting a single show based on the show's ID
    // Returned JSON is the show document
    // GET /shows/:id
    app.get('/shows/:id', showsController.getShow);


		/// Route for editing an existing show
    /*
    Request body expects:
    {
      "title": <show title>,
      "description": <show description>,
      "airDate": <show's air date>,
      "img": <display image for show>,
      "link": <link to show online>,
      "airInterval": <number of days between new episode release>,
      "approved": <if show is approved>,
    }
    */
    // Returned JSON is the updated show document
    // POST /shows/:id/edit
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
