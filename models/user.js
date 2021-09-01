const { DataTypes } = require("sequelize")
const dbConnection = require("../db")

const User = dbConnection.define("user", {
    pic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
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
        allowNull: true,
        unique: true
    },

    isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})

module.exports = User