// import module from `../models/db.js`
const db = require('../models/db.js');

const User = require('../models/userdb.js');

const Admin = require('../models/admindb.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for a certain path in the server
*/
const controller = {

    getIndex: function (req, res) {
        res.render('index', res);
    },

    getLogin: function (req, res) {
        res.render('Login',res);
    },

    getSignUp: function (req, res) {
        res.render('SignUp',res);
    },
    
    getSearch: function (req, res) {
        res.render('Search', res);
    },

    getProfile: function (req, res){
        res.render('Profile', res);
    },

    getProfileAdmin: function (req, res){
        res.render('ProfileAdmin', res);
    },

    getSettings: async function (req, res){

        var query = {idNumber: req.query.idNumber};
        const projection = 'idNumber firstName lastName';

        const resultUser = await db.findOne(User, query, projection);
        const resultAdmin = await db.findOne(Admin, query, projection);

        var details = {};
        
        if ( resultUser != null ) {
            details = {
                idNumber: resultUser.idNumber,
                firstName: resultUser.firstName,
                lastName: resultUser.lastName,
                res: res
            };
        }
        else if ( resultAdmin != null ) {
            details = {
                idNumber: resultAdmin.idNumber,
                firstName: resultAdmin.firstName,
                lastName: resultAdmin.lastName,
                res: res
            };
        }
        

        res.render('Settings', details);
    },

    getSchedule: function (req, res){
        res.render('Schedule', res);
    },

    getReservation: function (req, res){
        res.render('Reservation', res);
    },

    getReservationAdmin: function (req, res){
        res.render('ReservationAdmin', res);
    },

}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;
