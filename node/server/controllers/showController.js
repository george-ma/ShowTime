const { Show } = require('../models/show')
const { ObjectID } = require('mongodb')

module.exports = {

    //create a new user
    create(req, res) {
        console.log(req.body)

        // Create a new user
        const show = new Show({
            title: req.body.title,
            description: req.body.description,
            airDate: new Date(req.body.airDate),
            img: req.body.img,
            link: req.body.link,
            airInterval: req.body.airInterval,
            approved: req.body.approved
        })

        // save show to database
        show.save().then((result) => {
            res.send(show)
            }, (error) => {
                res.status(400).send(error) // 400 for bad request
            })
    },

    //get all shows
    getAllShows(req, res) {

        Show.find().then((shows) => {
                res.send(shows) // put in object in case we want to add other properties
            }, (error) => {
                res.status(400).send(error)
            })

    },

};
