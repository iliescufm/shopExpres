const Sequelize = require("sequelize");
const Connection = require("../database/dbConnection");

const User = Connection.define('user', {
    username: {
        type: Sequelize.STRING(),
    },
    password: {
        type: Sequelize.STRING(),
    },
    email: {
        type: Sequelize.STRING(),
    }
}, {underscored: true});

Connection.sync();
module.exports = User;
