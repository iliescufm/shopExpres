const Category = require('../models/Category');

exports.getCategories = async function(){
    return await Category.findAll();
};