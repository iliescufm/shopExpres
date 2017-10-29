const Sequelize = require("sequelize");
const Connection = require("../database/dbConnection");
const User = require("./User");

const UserAddress = Connection.define('user_address', {
    street: {
        type: Sequelize.STRING(),
    },
    number: {
        type: Sequelize.STRING(),
    },
    city: {
        type: Sequelize.STRING(),
    },
    postal_code:{
        type: Sequelize.STRING(),
    },
}, {underscored: true});

UserAddress.belongsTo(User);

Connection.sync();
module.exports = UserAddress;
