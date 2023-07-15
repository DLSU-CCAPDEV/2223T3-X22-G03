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
              ]
            },
            'firstName lastName "$expr" passengerType'
          ).exec();

        search = search.slice(0, 10);
        res.send({payload: search});
    }
};

module.exports = searchController;