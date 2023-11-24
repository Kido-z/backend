const product = require('../models/productModel');
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newProduct = await product.create(req.body);
      res.json(newProduct);
    } catch (error) {
      throw new Error(error);
    }
});

const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findProduct = await product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const getallProducts = await product.find();
        res.json(getallProducts);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await product.findOneAndUpdate({ id }, req.body, {
        new: true,
      });
      res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try {
      const deleteProduct = await product.findOneAndDelete(id);
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
});


module.exports = {
    createProduct,
    getaProduct,
    getAllProduct,  
    updateProduct,
    deleteProduct,
};