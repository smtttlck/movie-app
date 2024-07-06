const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define("movie", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    trailer_url : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    poster_path: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
    {
        tableName: 'movie',
        timestamps: false
    });

module.exports = Movie;