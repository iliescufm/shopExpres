const Sequelize = require("sequelize");

//Database configuration object
const config = {
    host: "devhacks.ckk3ujyskxnv.us-west-2.rds.amazonaws.com",
    database: "dbo",
    username: "root",
    password: "12345678"
};

//Initializing the database connection
const connection = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        logging: false,
        host: config.host,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
    );

//Exporting the connection for external usage
module.exports = connection;
