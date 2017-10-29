const Sequelize = require("sequelize");
const Connection = require("../database/dbConnection");

const Company = Connection.define('company', {
    name: {
        type: Sequelize.STRING(),
    },
    office: {
        type: Sequelize.STRING(),
    },
    city: {
        type: Sequelize.STRING(),
    }
}, {underscored: true});

Connection.sync();
module.exports = Company;
