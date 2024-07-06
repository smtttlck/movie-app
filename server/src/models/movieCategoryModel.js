const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MovieCategory = sequelize.define("movie_category", {
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "movie",
            key: "id"
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "category",
            key: "id"
        }
    }
},
    {
        tableName: 'movie_category',
        timestamps: false
    });

module.exports = MovieCategory;