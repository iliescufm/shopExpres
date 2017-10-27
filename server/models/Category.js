const Sequelize = require("sequelize");
const Connection = require("../database/dbConnection");
const Product = require("./Product");

const Category = Connection.define('categorie', {
    keyword: {
        type: Sequelize.STRING(),
    },
    unit: {
        type: Sequelize.STRING(),
    }
}, {underscored: true});

Category.belongsTo(Product);

Connection.sync();
module.exports = Category;
