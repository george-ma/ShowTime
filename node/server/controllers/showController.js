const { Show } = require('../models/show')
const { ObjectID } = require('mongodb')

module.exports = {

    // create a new show
    create(req, res) {
        console.log(req.body)

        // create a new show
        const show = new Show({
            title: req.body.title,
            description: req.body.description,
            airDate: new Date(req.body.airDate),
            img: req.body.img,
            link: req.body.link,
            airInterval: req.body.airInterval,
            approved: req.body.approved,
            updating: req.body.updating,
        })

        // save show to database
        show.save().then((result) => {
            res.send(show);
          }, (error) => {
            res.status(400).send(error); // 400 for bad request
          })
    },

    // get all approved shows
    getApprovedShows(req, res) {

        Show.find({approved: true}).then((shows) => {
            res.send(shows); // put in object in case we want to add other properties
          }, (error) => {
            res.status(400).send(error);
          })

    },

    // get all approved shows
    getUnapprovedShows(req, res) {

        Show.find({approved: false}).then((shows) => {
            res.send(shows); // put in object in case we want to add other properties
          }, (error) => {
            res.status(400).send(error);
          })

    },

    // removes show from all shows
    removeShow(req, res) {

      Show.findByIdAndRemove(req.body.showId).then((shows) => {
          res.send(shows); // put in object in case we want to add other properties
        }, (error) => {
          res.status(400).send(error);
        })

    },

    // approve show
    approveShow(req, res) {

      Show.findById(req.body.showId).then((show) => {
          show.approved = true;
          show.save().then((result) => {
            res.send(result);
          }, (error) => {
            res.status(400).send(error);
          });

        }, (error) => {
          res.status(400).send(error);
        })

    },

    // get a show by ID
    getShow(req, res) {

        const id = req.params.id

        // Good practise is to validate the id
        if (!ObjectID.isValid(id)) { return res.status(404).send() }

        // Otheriwse, findById
        Show.findById(id).then((show) => {
          if (!show) {
            res.status(404).send();
          } else {
            res.send( show );
          }

        }).catch((error) => {
            res.status(400).send(error);
        })
    },

    editShow(req, res) {

      const id = req.params.id

      // Good practise is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      // Otheriwse, findById
      Show.findById(id).then((show) => {
        if (!show) {
          res.status(404).send();
        } else {

          // update show parameters
          show.title = req.body.title;
          show.description = req.body.description;
          show.approved = req.body.approved;
          show.img = (req.body.img) ? req.body.img : show.img;
          show.link = (req.body.link) ? req.body.link : show.link;
          show.airDate = (req.body.airDate) ? req.body.airDate : show.airDate;
          show.airInterval = (req.body.airInterval) ? req.body.airInterval : show.airInterval;

          // save show
          show.save().then((result) => {
              res.send(show);
            }, (error) => {
              res.status(400).send(error); // 400 for bad request
            });
        }

      }).catch((error) => {
          res.status(400).send(error);
      })

    }
};
