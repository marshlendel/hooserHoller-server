const Express = require("express")
const app = Express()
require("dotenv").config()

//! Imports
const dbConnection = require("./db")

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log("[Server] app is listening on port 4000")
        })
    })

app.use(Express.json())
