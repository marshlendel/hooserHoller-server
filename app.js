const Express = require("express")
const app = Express()
require("dotenv").config()

//! Imports
const dbConnection = require("./db")
const controllers = require("./controllers")
const middleware = require("./middleware")

app.use(Express.json())
app.use(middleware.CORS)
app.use("/user", controllers.userController)
app.use(middleware.validateSession)
app.use("/room", controllers.roomController)


dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server] app is listening on port ${process.env.PORT}`)
        })
    })


