const UserService = require('../services/User');
const ProductService = require('../services/Product');

exports.login = async function(email, password){
    try{
        let user = await UserService.login(email, password);
        if(user === null){
            return {status:403, data:"Forbidden access"}
        }

        user = user.toJSON();
        delete user.password;
        return{status:200, data:user}
    }catch (err){
        console.log(err);
        return{status:500, data:"Server functionality error"}
    }
};

exports.register = async function(email, password, fullName){
    try{
        let findUser = await UserService.findByEmail(email);
        console.log(findUser);

        if(findUser !== null){
            return {status:409, data:"Email exists, conflict!"}
        }

        await UserService.register(email, password, fullName);
        let user = await UserService.findByEmail(email);

        user = user.toJSON();
        delete user.password;
        return{status:200, data:user}
    }catch (err){
        return{status:500, data:"Server functionality error"}
    }
};

exports.createPreference = async function(userId, categoryId, productId){
    try{
        let preferenceObject = {
            categorie_id: categoryId,
            product_id: productId,
            user_id: userId,
            ordered_quantity: ""
        };

        await UserService.createStrategy(preferenceObject, userId);

        return{status:200, data:""}
    }catch (err){
        return{status:500, data:"Server functionality error"}
    }
};

exports.obtainPreference = async function(categoryId, userId){
    try{
        let userPreference = await UserService.getPreferredProduct(categoryId, userId);

        if(userPreference === null){
            return userPreference;
        }

        let product = await ProductService.getProduct(userPreference.product_id);
        product.toJSON();

        return {status:200, data:product}
    }
    catch (err){
        console.log(err);
        return{status:500, data:"Server functionality error"}
    }
}