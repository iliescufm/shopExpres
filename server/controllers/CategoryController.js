const CategoryService = require('../services/Category');

exports.getCategories = async function(){
    try{
        let categories = await CategoryService.getCategories();

        return {status:200, data:categories}
    }
    catch(err){
        console.log(err);
        return{status:500, data:"Server functionality error"}
    }
};