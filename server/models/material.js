const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema(
	{
		owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		product: { type: String, required: true, maxLength: 100 },
		quantity: { type: Number, required: true, maxLength: 100 },
	},
	{ collection: 'materials' },
);

// Export model
module.exports = mongoose.model('Material', MaterialSchema);
