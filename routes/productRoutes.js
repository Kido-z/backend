const express = require('express');
const router = express.Router();
const {
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
  } = require('../controllers/productController');
  //const { authMiddleware } = require('../middlewares/authMiddleware');
  
  router.post("/", createProduct);
  router.put("/:id", updateProduct);
  router.get("/:id", getaProduct);
  router.get("/", getAllProduct); 
  router.delete("/:id", deleteProduct);

module.exports = router;