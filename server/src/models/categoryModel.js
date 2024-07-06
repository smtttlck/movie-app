const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    }
},
    {
        tableName: 'category',
        timestamps: false
    });

module.exports = Category;