const { DataTypes } = require("sequelize")
const dbConnection = require("../db")

const User = dbConnection.define("user", {
    fistName: {
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

    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = User