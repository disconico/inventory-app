const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema(
	{
		product: { type: String, required: true, maxLength: 100 },
		description: { type: String },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true, maxLength: 100 },
		owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ collection: 'materials' },
);

// Export model
module.exports = mongoose.model('Material', MaterialSchema);
