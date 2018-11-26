const User = require('../models/user').User
const Show = require('../models/show').Show
const { Rating } = require('../models/rating')
const { ObjectID } = require('mongodb')

module.exports = {

    //create a new user
    create(req, res) {
        console.log(req.body)

        // Create a new user
        const user = new Rating({
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

};
