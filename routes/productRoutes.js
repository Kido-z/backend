const express = require('express');
const router = express.Router();

// GET all products
router.get('/', (req, res, next) => {
    res.json({mssg: 'GET all products'});
});

/* // GET a single product
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single product'})
}); */

module.exports = router;