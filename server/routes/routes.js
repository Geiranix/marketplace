const express = require('express');
const { 
    createNewProduct, 
    getAvailableProducts, 
    deleteAllProducts, 
    getAProductById, 
    updateAProductById, 
    deleteAProductById, 
    searchProductsByName 
} = require('../controllers/products.controller');
const { 
    getAvailableCategories, 
    createACategory 
} = require('../controllers/category.controller');

const router = express.Router();

router.route('/product')
    .get(getAvailableProducts)
    .post(createNewProduct)
    .delete(deleteAllProducts);

router.route('/product/:id')
    .get(getAProductById)
    .delete(deleteAProductById)
    .put(updateAProductById);

router.route('/product/search')
    .get(searchProductsByName);

router.route('/category')
    .get(getAvailableCategories)
    .post(createACategory);

module.exports = router;
