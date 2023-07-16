const db = require('../models/db.js');

const User = require('../models/userdb.js');

const searchController = {

    getSearch : function (req, res) {
        res.render('Search', res);
    },

    postUserSearch : async function (req, res) {
        let payload = req.body.payload.trim();
        let search = await User.find(
            {
              $or: [
                { firstName: { $regex: new RegExp('^' + payload + '.*', 'i') } },
                { lastName: { $regex: new RegExp('^' + payload + '.*', 'i') } },
                { $expr: { $regexMatch: { input: { $concat: ['$firstName', ' ', '$lastName'] }, regex: new RegExp('^' + payload + '.*', 'i') } } },
                { passengerType: { $regex: new RegExp('^' + payload + '.*', 'i') } },
                { idNumber: parseInt(payload) || 0 }
              ]
            },
            'firstName lastName "$expr" passengerType idNumber'
          ).exec();

        search = search.slice(0, 10);
        res.send({payload: search});
    },

    getSearchProfile : async function (req, res) {
      var query = {idNumber: req.query.idNumber};

        var projection = 'idNumber firstName lastName designation passengerType';

        const result = await db.findOne(User, query, projection);
        
        if (result != null) {

            const details = {
                idNumber: result.idNumber,
                firstName: result.firstName,
                lastName: result.lastName,
                designation: result.designation,
                passengerType: result.passengerType
            };

            res.render('SearchProfile', details);
        }
        else {
            res.send('User does not exist.');
        }

    }
};

module.exports = searchController;