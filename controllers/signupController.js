const db = require('../models/db.js');

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/userdb.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('SignUp',res);
    },

    checkSignUp: async function (req, res) {
        const userId = req.params.idNumber
        console.log(userId)
        const parts = userId.split('=');
        const finalId = parts[1]
        console.log(typeof(finalId))
        console.log("Final ID Number is:")
        console.log(finalId)
        var isExisting = await User.find({'idNumber': finalId});
        console.log("Is Existing")
        console.log(isExisting)
        if (isExisting.length>0) {
            console.log("Existing Already!")
            res.json("error");
        } 
        else {
            res.json("unique")
        }
    },

    postSignUp: async function (req, res) {

        console.log("Inside PostSignUp")
        const { firstName, lastName, email, idNumber, password, securityCode, designation, passengerType } = req.body;
        console.log(req.body)

        const user = {
            firstName: req.body.user_firstName,
            lastName: req.body.user_lastName,
            email: req.body.user_email,
            idNumber: req.body.user_idNumber,
            password: await bcrypt.hash(req.body.user_password, saltRounds),
            securityCode: await bcrypt.hash(req.body.user_securityCode, saltRounds),
            designation: req.body.user_designation,
            passengerType: req.body.user_passengerType,
            profilePicture: "images/profilepictures/Default.png"
        }

        var isExisting = await User.findOne({'idNumber': idNumber});
        if (isExisting) { 
            console.log("ID NUMBER IS IN DATABASE")
            res.redirect("/SignUp")
        } 
        else {
            var result = await db.insertOne(User, req.body);
            if( result ){
                console.log('User successfully added');
                res.render("Login")
            }
            else{
                console.log('User not added');
            }
        }
    }
}

module.exports = signupController;
