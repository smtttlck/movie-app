const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("movies", process.env.DB_USERNAME, process.env.DB_PASSWORD, { // connection
    host: process.env.HOST || "localhost",
    dialect: "postgres"
});

sequelize.authenticate() // connection verify
    .then(() => console.log(`Connected to database '${sequelize.getDatabaseName()}' on host '${sequelize.options.host}'`))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

module.exports = sequelize;