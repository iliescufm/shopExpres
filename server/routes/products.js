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
    let details = req.body.details;

    let result = await ProductController.obtainProduct(details);
    res.status(result.status).send(result.data);
})

module.exports = router;