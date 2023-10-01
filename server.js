const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const express = require('express');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
// Security middleware to handle HTTP requests from different origins 
const cors = require('cors');
const app = express(); // express app 
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());

// All routes 
app.use('/', loginRoutes);
app.use('/api/productRoutes', productRoutes);
app.use('/api/categoryRoutes', categoryRoutes);
app.use('/api/customerRoutes', customerRoutes);

app.use(notFound);
app.use(errorHandler);

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