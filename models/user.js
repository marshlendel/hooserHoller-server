const { DataTypes } = require("sequelize")
const dbConnection = require("../db")

const User = dbConnection.define("user", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: true
    }
})

module.exports = User