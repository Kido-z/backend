const mongoose = require('mongoose');

const productSchema = mongoose.Schema ({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    age: { type: String, required: true },
    //image: { type: String, required: true},
    //productNumber: { type:Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);

