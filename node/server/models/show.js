/* User model */
const mongoose = require('mongoose')
Schema = mongoose.Schema

const validator = require('validator')

const ShowSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	airDate: {
		type: String
	},
	img:{
		type: String
	},
	link:{
		type: String
	},
	approved:{
		type: Boolean,
		required: true,
	},
	airInterval:{
		type: Number
	}
})

const Show = mongoose.model('Show', ShowSchema)

module.exports = { Show }
