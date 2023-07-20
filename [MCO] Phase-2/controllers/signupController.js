const db = require('../models/db.js');

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
            password: req.body.user_password,
            designation: req.body.user_designation,
            passengerType: req.body.user_passengerType,
        }

        var result = await db.insertOne(User, user);

        if( result ){
            console.log('User successfully added');
            res.redirect('/Login');
        }
        else{
            console.log('User not added');
        }
    }

}

module.exports = signupController;