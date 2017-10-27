const ProductService = require('../services/Product');

exports.obtainProduct = async function(){
    try{
        let categories = await CategoryService.getCategories();

        return {status:200, data:categories}
    }
    catch(err){
        console.log(err);
        return{status:500, data:"Server functionality error"}
    }
};