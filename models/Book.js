

const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model { }

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        contact_info: {
            type: DataTypes.STRING,
        },
        vacancy: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        publisher: {
            type: DataTypes.STRING,
        },
        borrowed_by: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'book',
    }
);

module.exports = Book;
