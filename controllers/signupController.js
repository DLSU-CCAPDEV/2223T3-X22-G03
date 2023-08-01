const db = require('../models/db.js');

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/userdb.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('SignUp',res);
    },

    postSignUp: async function (req, res) {
        const user = {
            firstName: req.body.user_firstName,
            lastName: req.body.user_lastName,
            email: req.body.user_email,
            idNumber: req.body.user_idNumber,
            password: await bcrypt.hash(req.body.user_password, saltRounds),
            securityCode: await bcrypt.hash(req.body.user_securityCode, saltRounds),
            designation: req.body.user_designation,
            passengerType: req.body.user_passengerType,
        }

        var result = await db.insertOne(User, user);

        if( result ){
			console.log(result);
            console.log('User successfully added');
            res.render('Login', {isRegistered: true});
        }
        else{
            console.log('User not added');
        }
    }

}

module.exports = signupController;
