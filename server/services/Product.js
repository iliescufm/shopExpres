const Product = require('../models/Product');

exports.getCategories = async function(){
    return await Category.findAll();
};