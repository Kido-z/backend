const express = require('express');

const Toy = require('../models/productModel')

const router = express.Router();

// GET all toys
router.get('/', (req, res) => {
    res.json({mssg: 'GET all toys'})
});

// GET a single toy
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single toy'})
});

module.exports = router;