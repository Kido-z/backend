require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const toysRoutes = require('./routes/toys')

// express app 
const app = express();

//cors
app.use(cors())

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

// routes 
app.use('/api/toys', toysRoutes) 

//connect to database
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
    