const Product = require('../models/Product');
const connection = require('../database/dbConnection');


exports.obtainApproximateProduct = async function(id, quantity){
    return await connection.query(`
        SELECT products.*
        FROM products
        WHERE products.package <= ${quantity} AND products.categorie_id = ${id}
    `);
};

exports.obtainMaxProduct = async function(id, quantity){
    return await connection.query(`
        SELECT MAX(CAST(package AS DECIMAL)) AS max
        FROM products
        INNER JOIN(
            SELECT *
            FROM categories
            WHERE id = ${id}
        ) DT
        ON products.categorie_id = DT.id
        WHERE products.package <= ${quantity}
    `);
};

exports.getOtherProducts = async function(array, categoryId){
    return await Product.findAll({where: {
        id:{
            $not: array
        },
        categorie_id: categoryId
    }})
};

exports.getProduct = async function(id){
    return await Product.findOne({where: {
        id: id
    }})
}