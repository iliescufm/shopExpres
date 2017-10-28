const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');

//Routing declaration area
router.get('/getCategories', async function(req, res) {
    let result = await CategoryController.getCategories();
    res.status(result.status).send(result.data);
});

router.post('/obtainProduct', async function(req, res){
    let categoryId = req.body.category_id;
    let userId = req.body.user_id;
    let quantity = req.body.quantity;

    let result;

    let obtainPreference = await UserController.obtainPreference(categoryId, userId);
    console.log(obtainPreference);

    if(obtainPreference !== null){
        obtainPreference.package = quantity;
        result = obtainPreference;
    } else {
        result = await ProductController.obtainProduct(categoryId, quantity);
    }

    res.status(result.status).send([result.data]);
});

router.post('/obtainOptionalProducts', async function(req, res){
   let array = req.body.ids;
   let categoryId = req.body.category;

   let result = await ProductController.obtainOptionalProducts(array, categoryId);
   res.status(result.status).send(result.data);
});

module.exports = router;