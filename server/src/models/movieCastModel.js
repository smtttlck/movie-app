const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MovieCast = sequelize.define("movie_cast", {
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "movie",
            key: "id"
        }
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "actor",
            key: "id"
        }
    },
    character_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
    {
        tableName: 'movie_cast',
        timestamps: false
    });

module.exports = MovieCast;