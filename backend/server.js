require('dotenv').config();

const express = require('express');
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

// listen for requests 
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
});