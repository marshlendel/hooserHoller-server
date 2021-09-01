const { DataTypes } = require("sequelize")
const dbConnection = require("../db")

const Message = dbConnection.define("message", {
    pic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    roomId: {
        type:DataTypes.INTEGER,
        allowNull: false
    },

    likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },

    date: {
        type: DataTypes.STRING,
        allowNull: false
    },

    time: {
        type: DataTypes.STRING,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Message