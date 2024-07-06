const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    level: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
            isIn: [["root", "admin"]]
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
},
    {
        tableName: 'admin',
        timestamps: false
    });

module.exports = Admin;