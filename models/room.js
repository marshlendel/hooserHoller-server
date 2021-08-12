const { DataTypes } = require("sequelize")
const dbConnection = require("../db")

const Room = dbConnection.define("room", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    addedUsers: {
        type: DataTypes.ARRAY,
        allowNull: true
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Room