require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Security middleware to handle HTTP requests from different origins 
const cors = require('cors');
const app = express(); // express app 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loginRoutes = require('./routes/loginRoutes');
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
app.use(cookieParser());

// All routes 
app.use('/', loginRoutes);
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