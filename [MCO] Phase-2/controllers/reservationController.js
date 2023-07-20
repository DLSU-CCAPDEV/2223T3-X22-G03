const db = require('../models/db.js');

const User = require('../models/userdb.js');

const Admin = require('../models/admindb.js');

const Reservation = require('../models/reservationdb.js');

const reservationController = {

    getReservations: async function (req, res) {
		
		var userID = req.query.idNumber;
        const query = { idNumber: userID };
        const projection = { idNumber: 1 };
		
        const isAdmin = await db.findOne(Admin, query, projection);

		const result = await db.findMany(Reservation, {idNumber: userID}, {_id:0, __v:0});

        if ( isAdmin != null ) {
            res.render('Reservation', {displayUI: 1, result: result, idNumber: userID, isAdmin: true});
        } else {
            res.render('Reservation', {displayUI: 0, result: result, idNumber: userID, isAdmin: false});
        }
		
    },

    getReservationAdmin: function (req, res) {
        res.render('ReservationAdmin', res);
    },

	//Add reservation
	postReservations: async function (req, res) {
        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="fName">
            can be retrieved using `req.body.fName`
        */		
        var rsv = {
			startCampus: req.body.hiddenStartCampus,
			date: req.body.user_date,
			entryLoc: req.body.hiddenEntryLoc,
			entryTime: req.body.hiddenEntryTime,
			exitLoc: req.body.hiddenExitLoc,
			exitTime: req.body.hiddenExitTime,
			idNumber: req.body.hiddenIdNumber
		};
        /*
            calls the function insertOne()
            defined in the `database` object in `../models/db.js`
            this function adds a document to collection `reservations`
        */
        db.insertOne(Reservation, rsv, function(flag) {
            if(flag){
                console.log('Reservation successfully added');
                res.redirect('/Reservation?idNumber=' + req.body.hiddenIdNumber);
            }
        });
    },

	postUpdateReservations: async function (req, res){
		var curr ={
			startCampus: req.body.eCurrStartCampus,
			date: req.body.eCurrDate,
			entryLoc: req.body.eCurrEntryLoc,
			entryTime: req.body.eCurrEntryTime,
			exitLoc: req.body.eCurrExitLoc,
			exitTime: req.body.eCurrExitTime,
			idNumber: req.body.eCurrIdNumber
		}

		var upd = {
			startCampus: req.body.ehiddenStartCampus,
			date: req.body.user_date,
			entryLoc: req.body.ehiddenEntryLoc,
			entryTime: req.body.ehiddenEntryTime,
			exitLoc: req.body.ehiddenExitLoc,
			exitTime: req.body.ehiddenExitTime,
			idNumber: req.body.ehiddenIdNumber
		}

		console.log("current reservation:");
		console.log(curr);
		console.log("To be updated with: ");
		console.log(upd);

		var found = await db.findOne(Reservation, curr);
		if(found){
			await Reservation.updateOne(curr, upd);
			console.log('succesfully updated');
			res.redirect('/Reservation?idNumber=' + req.body.ehiddenIdNumber);
		}
		else{
			console.log("Code monkeys did an oopsie daisy");
			console.log('error somewhere');
		}
	},

	postDelete: async function (req, res){
		var rsv = {
			startCampus: req.body.dCurrStartCampus,
			date: req.body.dCurrDate,
			entryLoc: req.body.dCurrEntryLoc,
			entryTime: req.body.dCurrEntryTime,
			exitLoc: req.body.dCurrExitLoc,
			exitTime: req.body.dCurrExitTime,
			idNumber: req.body.dCurrIdNumber
		};

		console.log('to delete');
		console.log(rsv);
		var deleted = await Reservation.deleteOne(rsv);
		if(deleted){
			console.log('succesfully deleted');
			res.redirect('/Reservation?idNumber=' + req.body.dCurrIdNumber);
		}
		else{
			console.log("Code monkeys did an oopsie daisy");
			console.log('error somewhere');
		}

	}
    
}

module.exports = reservationController;
