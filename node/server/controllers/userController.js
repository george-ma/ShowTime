const { User } = require('../models/user')
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
            bio: " ",
            img: " "
        })

        // save user to database
        user.save().then((result) => {
            user.password=""
            res.send(user)
            }, (error) => {
                res.status(400).send(error) // 400 for bad request
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

        User.findByIdAndUpdate(id,{$set:req.body}).then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send( user )
            }
        })
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

        // Find by attributes
        User.findOne({username: req.body.username, password: req.body.password}, 'username email is_banned is_admin my_shows').then((student, error) => {
        if (!student) {
            res.status(404).send("Invalid username or password")
        } else {
            if (student.is_banned) {
              res.status(404).send("Sorry your are banned from the site")
            } else {
              res.send(student)
            }
        }

        }).catch((error) => {
            res.status(400).send(error)
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
};
