require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); // express app 
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use((req, res, next) => {
    console.log('Requete reçu'); //console.log(req.path, req.method)
    next()
});

// Used bodyParser for handle the data on JSON
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
// All routes 
app.use('/api/productRoutes', productRoutes);
app.use('/api/categoryRoutes', categoryRoutes);
app.use('/api/customerRoutes', customerRoutes);

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests 
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })