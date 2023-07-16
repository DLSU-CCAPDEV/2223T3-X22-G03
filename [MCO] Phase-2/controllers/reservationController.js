const db = require('../models/db.js');

const Admin = require('../models/admindb.js');

const reservationController = {

    getReservation: async function (req, res) {

        const query = { idNumber: req.query.idNumber };
        const projection = { idNumber: 1 };

        const result = await db.findOne(Admin, query, projection);

        if ( result != null ) {
            res.render('Reservation', {displayUI: 1});
        } else {
            res.render('Reservation', {displayUI: 0});
        }

    },

    getReservationAdmin: function (req, res) {
        res.render('ReservationAdmin', res);
    }
    
}

module.exports = reservationController;