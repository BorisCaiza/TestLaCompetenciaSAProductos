const mongoose = require('mongoose');
const { Schema } = mongoose;



const ProducSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    sku: { type: String, require: true },
    cost: { type: Number }

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProducSchema);