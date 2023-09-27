const express = require('express');
const router = express.Router();

// GET all categories
router.get('/', (req, res, next) => {
    res.json({mssg: 'GET all customers'});
});


module.exports = router;