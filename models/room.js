const { DataTypes } = require("sequelize")
const dbConnection = require("../db")


const Room = dbConnection.define("room", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Room