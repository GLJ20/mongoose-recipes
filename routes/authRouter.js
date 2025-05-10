const express = require("express")
//similar to app but acts as a mini version of it
const router = express.Router()

const authController = require("../controllers/authController.js")

router.post("/sign-up", authController.registerUser)
router.post("/sign-in", authController.signInUser)

module.exports = router