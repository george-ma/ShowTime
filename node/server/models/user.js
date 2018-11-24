/* User model */
const mongoose = require('mongoose')
Schema = mongoose.Schema

const validator = require('validator')

const { Show } = require('../models/show')

// We'll make this model in a different way
// using mongoose's Schema object
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 6,
		trim: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email.'
		}
	},
	password: { type: String, required: true, minlength: 6 },
    bio: { type: String },
    img: { type: String },
	is_admin:{ type: Boolean, required: true },
	is_banned:{ type: Boolean, required: true },
	my_shows : [{ type: Schema.Types.ObjectId, ref: 'Show' }]
})


const User = mongoose.model('User', UserSchema)


module.exports = {User}
