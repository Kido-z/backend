const mongoose = require('mongoose');

const productSchema = mongoose.Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    age: { type: Number, required: true },
    imageUrl: { type: String, required: true},
    productNumber: { type:Number, required: true }
});

module.exports = mongoose.model('productModel', productSchema);

