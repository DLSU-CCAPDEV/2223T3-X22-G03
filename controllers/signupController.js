const db = require('../models/db.js');
const User = require('../models/userdb.js');
// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;



const signupController = {

    getSignUp: function (req, res) {
        res.render('SignUp',res);
    },

 
    checkSignUp: async function (req, res) {
        console.log("INSIDE SIGN UP")
        const idnumber = parseInt(req.params.idNumber);
        console.log(idnumber)
        
        const user = await User.find({idNumber: idnumber})
        if(user.length > 0){
            console.log(user)
            res.json("Taken")
        }
        else{
            res.json("Unique")
        }
        
    },

    postSignUp: async function (req, res) {

        console.log("Inside PostSignUp")
        const { firstName, lastName, email, idNumber, password, securityCode, designation, passengerType } = req.body;
        
        var newPass = await bcrypt.hash(password,saltRounds)
        var newSecurityCode = await bcrypt.hash(securityCode,saltRounds)

        console.log(req.body)

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            idNumber: idNumber,
            password: newPass,
            securityCode: newSecurityCode,
            designation: designation,
            passengerType: passengerType,
            profilePicture: "images/profilepictures/Default.png"
        }
        console.log(user)
        
        var isExisting = await User.findOne({'idNumber': idNumber});
        if (isExisting) { 
            console.log("ID NUMBER IS IN DATABASE")

        } 
        else {
            var result = await db.insertOne(User, user);
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
