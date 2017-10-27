const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');

//Routing declaration area
router.get('/getCategories', async function(req, res) {
    let result = await CategoryController.getCategories();
    res.status(result.status).send(result.data);
});

router.post('/obtainProduct', async function(req, res){
    let id = req.body.id;
    let quantity = req.body.quantity;

    let result = await ProductController.obtainProduct(id, quantity);
    res.status(result.status).send(result.data);
});

router.post('/obtainOptionalProducts', async function(req, res){
   let array = req.body.ids;
   let categoryId = req.body.category;

   let result = await ProductController.obtainOptionalProducts(array, categoryId);
   res.status(result.status).send(result.data);
});

module.exports = router;