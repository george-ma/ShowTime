/* User model */
const mongoose = require('mongoose')
Schema = mongoose.Schema

const validator = require('validator')

const { Show } = require('../models/show')
const { User } = require('../models/user')

// We'll make this model in a different way
// using mongoose's Schema object
const StatusSchema = new mongoose.Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
    ref: 'User'
	},
  show_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Show'
  },
	status: {
		type: String,
		required: true
	}
})


const Status = mongoose.model('Status', StatusSchema)


module.exports = { Status}
