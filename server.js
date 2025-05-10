const express = require("express")
const logger = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
require("dotenv").config()

const db = require("./db")//it knows to look for index.js without us writing it

const authRouter = require("./routes/authRouter.js")
const PORT = process.env.PORT ? process.env.PORT : 3003
const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
//any endpoint starting with /auth need to go to authRouter for routing
app.use("/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Our app is connected....")
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
