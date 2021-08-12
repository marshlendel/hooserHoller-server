const Sequelize = require("sequelize")
const dbConnection = new Sequelize(process.env.DB_URL)

module.exports = dbConnection