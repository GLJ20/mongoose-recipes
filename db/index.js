const mongoose = require("mongoose")
require("dotenv").config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Successfully connected to MongoDB Database") 
    } catch (error) {
        console.error("Conncetion error", error.message)
    }
}

connect()
//represents a successfull connection to the db
module.exports = mongoose.connection