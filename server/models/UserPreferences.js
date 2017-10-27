const Sequelize = require("sequelize");
const Connection = require("../database/dbConnection");
const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");

const UserPreferences = Connection.define('user_preferences', {
    ordered_quantity: {
        type: Sequelize.STRING(),
    }
}, {underscored: true});

UserPreferences.belongsTo(User);
UserPreferences.belongsTo(Product);
UserPreferences.belongsTo(Category);

Connection.sync();
module.exports = UserPreferences;
