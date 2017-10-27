const User = require('../models/User');
const UserPreferences = require('../models/UserPreferences');
const connection = require('../database/dbConnection');

exports.login = async function(email, password){
    return await User.findOne({where: {
        email: email,
        password: password
    }})
};

exports.register = async function(email, password, fullName){
    return await User.create({
        email: email,
        password: password,
        full_name: fullName
    })
};

exports.findByEmail = async function(email){
    return await User.findOne({where:{
        email: email
    }})
};

exports.createStrategy = async function(object, userId){
    try {
        return await updateOrCreate(UserPreferences, object, {user_id: userId})
    }
    catch (err){
        console.log(err);
        throw Error("Something went wrong");
    }
};

exports.getPreferredProduct = async function(categoryId, userId){
    return await UserPreferences.findOne({where:{
        categorie_id: categoryId,
        user_id: userId
    }})
}

//For this function you will need it to give
//The model
//The values object that you need to insert it
//The condition for where to look after
async function updateOrCreate(model, values, condition){
    let findData = await model.findOne({where: condition});

    if (findData) {
        return await findData.update(values);
    } else {
        return await model.create(values);
    }
}