const User = require('../models/user').User
const Show = require('../models/show').Show
const { Rating } = require('../models/rating')
const { ObjectID } = require('mongodb')

module.exports = {

    //create a new user
    create(req, res) {
        console.log(req.body)
        Rating.findOneAndUpdate({show_id:req.body.show_id, user_id: req.body.user_id},{$set:req.body}, {upsert: true}).then((result) => {
              res.send(req.body)
            }, (error) => {
              res.status(400).send(error) // 400 for bad request
        })
    },

    //get all ratings
    getAllRatings(req, res) {

        Rating.find().then((result) => {
                res.send( result ) // put in object in case we want to add other properties
            }, (error) => {
                res.status(400).send(error)
            })

    },


    getAvgRating(req, res) {
      Rating.aggregate([{$group:
        {_id:
          {show_id:"$show_id"},
          count:{$sum: 1},
          avg:{$avg: "$rating"}
        }
      }]).then((results) => {
              filtered = results.filter(result => result._id.show_id == req.params.show_id )
              res.send( filtered )
          }, (error) => {
              res.status(400).send(error)
          })
    },

    numberofStatus(req, res) {
      Rating.aggregate([{$group:
        {_id:
          {status:"$status", show_id:"$show_id"},
          count:{$sum: 1},
          avg:{$avg: "$rating"}
        }
      }]).then((results) => {
              filtered = results.filter(result => result._id.show_id == req.params.show_id )
              res.send( filtered )
          }, (error) => {
              res.status(400).send(error)
          })

    },

    getReviews(req, res) {
      Rating.aggregate([{$group:
        {_id:
          {status:"$status", show_id:"$show_id", user_id:"$user_id", review:"$review"},
        }
      }]).populate('user_id').then((results) => {
              filtered = results.filter(result => result._id.show_id == req.params.show_id )
              res.send( filtered )
          }, (error) => {
              res.status(400).send(error)
          })

    },
    /*
    {$group: {_id: product._id, average: {$avg: '$Rating'}}}
    {
      $project:{
        avgrating: { $avg: {$group:{rating:"$rating"}}}
      }
    }
    // Group documents by created_at, sender and calculate number of documents.
{$group:
  {_id:
    {created_at:"$created_at", sender:"$sender"},
    count:{$sum: 1}
  }
}
    */

};
