const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Actor = sequelize.define("actor", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    place_of_birth: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img_path: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
    {
        tableName: 'actor',
        timestamps: false
    });

module.exports = Actor;