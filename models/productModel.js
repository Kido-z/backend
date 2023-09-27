const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema
({
    title: 
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    age:
    {
        type: Number,
        required: true
    },
    image: 
    {
        required: true
    } 
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)

