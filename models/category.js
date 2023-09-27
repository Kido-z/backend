const mongoose = require('mongoose');

const categorySchema = mongoose.Schema ({
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    condition: { type: String, required: true }
})

module.exports = mongoose.model('category', categorySchema)

