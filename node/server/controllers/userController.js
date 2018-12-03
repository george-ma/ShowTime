const User = require('../models/user').User
const Show = require('../models/show').Show
const { ObjectID } = require('mongodb')

module.exports = {

    //create a new user
    create(req, res) {
        console.log(req.body)

        // Create a new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            is_admin: false,
            is_banned: false,
            bio: "",
            img: ""
        })

        // save user to database
        user.save().then((result) => {
            user.password = "";
            res.send(user);
            }, (error) => {
                res.status(400).send(error); // 400 for bad request
            })
    },

    // create a new admin
    createAdmin(req, res) {
        console.log(req.body)

        // Create a new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            is_admin: true,
            is_banned: false,
            bio: "",
            img: ""
        })

        // save user to database
        user.save().then((result) => {
            user.password = "";
            res.send(user);
            }, (error) => {
                res.status(400).send(error); // 400 for bad request
            })
    },

    // remove user by id
    remove(req, res) {
        const id = req.params.id

        // Good practice is to validate the id
        if (!ObjectID.isValid(id)) { return res.status(404).send() }

        User.findByIdAndRemove(id).then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send( user )
            }
        })
    },

    // update user by id
    update(req, res) {
        const id = req.params.id

        // Good practice is to validate the id
        if (!ObjectID.isValid(id)) { return res.status(404).send() }

        User.findById(id).then( (user) => {
            if (!user){
                res.status(404).send();
            } else {

                // update user attributes
                user.email = (req.body.email) ? req.body.email : user.email;
                user.password = (req.body.password) ? req.body.password : user.password;
                user.bio = (req.body.bio) ? req.body.bio : user.bio;
                user.img = (req.body.img) ? req.body.img : user.img;

                user.save().then( (result) => {
                    res.send(result)
                }, (error) => {
                    res.status(400).send(error)
                })
            }
        }).catch((error) => {
            res.status(400).send(error);
        })

        // User.findOne({'_id': id}).then( (user) => {
        //     user.set(req.body)

        //     user.save().then( (result) => {
        //         res.send(result)
        //     }, (error) => {
        //         res.status(400).send(error)
        //     })

        // })
    },

    //get a user
    getUser(req, res) {

        const id = req.params.id

        // Good practise is to validate the id
        if (!ObjectID.isValid(id)) {
        return res.status(404).send()
        }

        // Otheriwse, findById
        User.findById(id).then((student) => {
        if (!student) {
            res.status(404).send()
        } else {
            res.send( student )
        }

        }).catch((error) => {
            res.status(400).send(error)
        })
    },

    //login a user
    loginUser(req, res) {

        const username = req.body.username
        const password = req.body.password

        User.findByUserPassword(username, password).then((user) => {
            if(!user) {
                res.status(404).send("Username not found.")
                // res.redirect('/login')
            } else {
                if (user.is_banned) {
                    res.status(401).send("Sorry, you are banned from the site.")
                } else { // not banned
                  req.session.user = user._id;
                  req.session.email = user.email
                  user.password = "";
                  res.send(user)
                }
            }
        }).catch((error) => {
            res.status(404).send("Incorrect user/password combination.")
        })
    },

    //login a user
    logoutUser(req, res) {
      req.session.destroy((error) => {
    		if (error) {
    			res.status(500).send(error)
    		} else {
    			res.send("success")
    		}
    	})
    },

    //get all users
    getAllUsers(req, res) {

        User.find().then((users) => {
                res.send( users ) // put in object in case we want to add other properties
            }, (error) => {
                res.status(400).send(error)
            })

    },

    // add new show to user
    addShow(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id).then((user) => {
        user.my_shows.push(req.body.showId);

        user.save().then((result) => {
          user.password = '';
          res.send(result);
        }, (error) => {
          res.status(400).send(error);
        });

      }, (error) => {
        res.status(400).send(error);
      })

    },

    // removes show from user's list
    removeShow(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id).then((user) => {
        user.my_shows = user.my_shows.filter(showId => showId != req.body.showId);

        user.save().then((result) => {
          user.password = '';
          res.send(result);
        }, (error) => {
          res.status(400).send(error);
        });

      }, (error) => {
        res.status(400).send(error);
      })

    },

    // get shows that belong to user
    getMyShows(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id, "my_shows").populate('my_shows').then((user) => {
        res.send(user.my_shows);

      }, (error) => {
        res.status(400).send(error);
      })

    },

    // get shows that do not belong to this user
    getNotMyShows(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id, "my_shows").populate('my_shows').then((user) => {
        Show.find({_id: {$nin: user.my_shows}, approved: true}).then((shows) => {
          res.send(shows);

        }, (error) => {
          res.status(400).send(error);
        })

      }, (error) => {
        res.status(400).send(error);
      })

    },

    isMyShow(req, res) {

      const id = req.params.id
      const show_id = req.params.show_id
      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }
      if (!ObjectID.isValid(show_id)) { return res.status(404).send() }

      User.findById(id, "my_shows").populate('my_shows').then((user) => {
        for( show of user.my_shows){
          if(show._id == show_id ){
            res.status(200).send(true);
          }
        }
        res.status(200).send(false);
      }, (error) => {
        res.status(400).send(error);
      })

    },
};
