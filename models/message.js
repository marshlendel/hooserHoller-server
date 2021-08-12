const { DataTypes } = require("sequelize")
const dbConnection = require("../db")

const Message = dbConnection.define("message", {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },

    likes: {
        type: DataTypes.ARRAY,
        allowNull: true
    },

    room: {
        type: DataTypes.STRING,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Message