const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

//Routing declaration area
router.get('/getCategories', async function(req, res) {
    let result = await CategoryController.getCategories();
    res.status(result.status).send(result.data);
});

module.exports = router;