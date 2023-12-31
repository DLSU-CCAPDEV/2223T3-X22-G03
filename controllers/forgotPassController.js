const db = require('../models/db.js');

const User = require('../models/userdb.js');

const Admin = require('../models/admindb.js');

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { validationResult } = require('express-validator');

const forgotPassController = {

    getForgotPassword: function (req, res) {
        res.render('ForgotPassword', res);
    },

    postForgotPassword: async function (req, res){

      var errors = validationResult(req);

      if ( !errors.isEmpty() ){

        errors = errors.errors;

        var details = {};
        for ( var i = 0; i < errors.length; i++ ){
            details[errors[i].path + 'Error'] = errors[i].msg;
        }

        res.render('ForgotPassword', details);

      }
      else{

        var query = {email: req.body.user_email };
        const projection = { idNumber: 1, email: 1, securityCode: 1 };

        const resultUser = await db.findOne(User, query, projection);
        const resultAdmin = await db.findOne(Admin, query, projection);

        var details = {};

        console.log(resultUser);

        if ( resultUser != null && resultUser.email == req.body.user_email && await bcrypt.compare(req.body.user_securityCode, resultUser.securityCode) ) {
            console.log('User email and security code match.');

            details = {
                idNumber: resultUser.idNumber,
                email: resultUser.email,
                securityCode: resultUser.securityCode
            }
            
            res.render('ForgotPassword', details);
        }
        else if ( resultAdmin != null && resultAdmin.email == req.body.user_email && await bcrypt.compare(req.body.user_securityCode, resultAdmin.securityCode) ) {
            console.log('Admin email and security code match.');

            details = {
                idNumber: resultAdmin.idNumber,
                email: resultAdmin.email,
                securityCode: resultAdmin.securityCode
            }

            res.render('ForgotPassword', details);
        }
        else{

            res.render('ForgotPassword', { isInvalid: true });
        }

      }
        

    },

    postChangeFPassword: async function (req, res){

        var errors = validationResult(req);

        if ( !errors.isEmpty() ){

            errors = errors.errors;

            var details = {};
            for ( var i = 0; i < errors.length; i++ ){
                details[errors[i].path + 'Error'] = errors[i].msg;
            }

            res.render('ForgotPassword', details);

        }else{

            var newPassword0 = req.body.user_newPassword0;
            var newPassword1 = req.body.user_newPassword1;

            if ( newPassword0 == newPassword1 ){   


                var query = {idNumber: req.body.idNumber};
                const projection = { idNumber: 1, password: 1};

                const resultUser = await db.findOne(User, query, projection);
                const resultAdmin = await db.findOne(Admin, query, projection);

                if ( resultUser != null ) {
                    await User.updateOne(query, {password: await bcrypt.hash(newPassword1, saltRounds)})
                    console.log("Change password successful");
                    res.render('Login', { codeChange: true } );
                }
                else if ( resultAdmin != null ) {
                    await Admin.updateOne(query, {password: await bcrypt.hash(newPassword1, saltRounds)})
                    console.log("Change password successful");
                    res.render('Login', { codeChange: true } );
                } else {
                    console.log("User/Admin password change unsuccessful. No user/admin found.");
                    res.render('ForgotPassword', res);
                }

            }
            else{
                res.render('ForgotPassword', { isMatch: false, idNumber: req.body.idNumber } );
            }

        }

    
    }
}

module.exports = forgotPassController;