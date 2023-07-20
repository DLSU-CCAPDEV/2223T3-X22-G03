const db = require('../models/db.js');

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
            res.render('Reservation', {displayUI: 1, result: result, idNumber: userID});
        } else {
            res.render('Reservation', {displayUI: 0, result: result, idNumber: userID});
        }
		
    },

    getReservationAdmin: function (req, res) {
        res.render('ReservationAdmin', res);
    }
    
}

module.exports = reservationController;
