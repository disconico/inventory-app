const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const UserSchema = new Schema(
	{
		first_name: { type: String, required: true, maxLength: 100 },
		family_name: { type: String, required: true, maxLength: 100 },
		date_of_birth: { type: Date },
		is_friendly: { type: Boolean, required: true },
	},
	{ collection: 'users' },
);

// Export model
module.exports = mongoose.model('User', UserSchema);
