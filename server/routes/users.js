const express = require('express');
const router = express.Router();

const UserController = require("../controllers/UserController");

//Routing declaration area
router.post('/login', async function(req, res) {

    let email = req.body.email;
    let password = req.body.password;

    let result = await UserController.login(email, password);
    res.status(result.status).send(result.data);
});

router.post('/register', async function(req, res) {

    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.full_name;

    let result = await UserController.register(email, password, fullName);
    res.status(result.status).send(result.data);
});

router.post('/getCategories', async function(req, res) {
    let userId = parseInt(req.body.user_id);
    let categoryId = parseInt(req.body.category_id);
    let productId = parseInt(req.body.product_id);

    let result = await UserController.createPreference(userId, categoryId, productId);
    res.status(result.status).send(result.data);
});

module.exports = router;