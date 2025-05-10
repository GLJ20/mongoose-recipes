const bcrypt = require("bcrypt")
const User = require("../models/User.js")

const registerUser = async (req, res) => {
    try {
        //before creating a user we need to check a few things
        //first check if the user exists or not
        const userInDB = await User.findOne({ email: req.body.email })//this will be from the html form posted for signup
        if (userInDB) {
            return res.send("Username is already taken")
        }
        //then check if the password is equal to the confirmed password
        if (req.body.password !== req.body.confirmPassword) {
            return res.send("Password and Confirm Password must match")
        }
        //now hash the password that did match the confirm password
        const hashedPw = bcrypt.hashSync(req.body.password, 12)
        //after ensuring the user isnt already in the db and password matches and hash the password
        //it is time to create the user
        const user = await User.create({
            email: req.body.email,
            password: hashedPw,
            first: req.body.first,
            last: req.body.last,
            picture: req.body.picture,
            recipe: []
        })
        //now for testing, we will send a response
        res.send(`Thank you for signing up, ${user.first}!`)
    } catch (error) {
        console.error("An error has occured while registering", error.message)
    }
}

const signInUser = async (req, res) => {
    try {
        //this will have the whole document of one user, which will include other info like password
        const user = await User.findOne({ email: req.body.email})
        //first check if the user doesnt exist to not proceed with the remaining code if they dont exist
        if(!user){
            res.send("No user has been registered with that email. Please sign up")
        }
        //now compare their password with bcrypt. This will send a boolean value
        const validPw = bcrypt.compareSync(
            req.body.password,//this is the password they currently wrote while signing in
            user.password//user.password is the hashed pw from the registerfunction
        )
        //again, we will check if it is incorrect for better error handling so that if password doesnt match, we stop and not go further with the function
        if(!validPw){
            return res.send("Incorrect password! Please try again")
        }
        //this can then be refernced as req.session.user and we can access the info in it
        req.session.user = {
            email: user.email,
            _id: user._id
        }
        res.send(`Thank you for signing in, ${user.first}!`)
    } catch (error) {
        console.error('An error has occurred signing in a user!', error.message)
    }
}
//to make exporting multiple things easier, so instead of importing exactly registeruser
//we can export it in an object and then inside authrouter write authcontroller.resgisteruser
module.exports = {
    registerUser,
    signInUser
}