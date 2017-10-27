const Sequelize = require("sequelize");
const Connection = require("../database/dbConnection");
const Company = require("./Company");
const Category = require("./Category");

const Product = Connection.define('product', {
    name: {
        type: Sequelize.STRING(),
    },
    price: {
        type: Sequelize.FLOAT(),
    },
    image_path: {
        type: Sequelize.STRING(),
    },
    package: {
        type: Sequelize.STRING(),
    }
}, {underscored: true});

Product.belongsTo(Company);
Product.belongsTo(Category);

Connection.sync();
module.exports = Product;
