const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const UserSchema = new Schema(
	{
		first_name: { type: String, required: true, maxLength: 100 },
		family_name: { type: String, required: true, maxLength: 100 },
		date_of_birth: { type: Date },
	},
	{ collection: 'users' },
);

UserSchema.virtual('date_of_birth_formatted').get(function () {
	return this.date_of_birth
		? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
		: '';
});

UserSchema.virtual('url').get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/users/${this._id}`;
});

// Export model
module.exports = mongoose.model('User', UserSchema);
