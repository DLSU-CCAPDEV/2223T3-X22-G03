const db = require('../models/db.js');

const bcrypt = require('bcrypt');

const User = require('../models/userdb.js');

const Admin = require('../models/admindb.js');

const loginController = {

    getLogin: function (req, res) {
        res.render('Login', res);
    },
    
    postLogin: async function (req, res) {
        const idNumber = req.body.user_idNumber;
        const password = req.body.user_password;
      
        try {
			const query = { idNumber: idNumber };
			const projection = { idNumber: 1, password: 1};
			const result = await db.findOne(User, query, projection);
			const result2 = await db.findOne(Admin, query, projection);
			
			if (result && await bcrypt.compare(password, result.password)) {
				res.redirect('/SecurityCheck?idNumber=' + idNumber);
			} else if (result2 && await bcrypt.compare(password, result2.password)) {
				res.redirect('/SecurityCheck?idNumber=' + idNumber);
			} else {
				res.render('Login', { isValid: false })
			}
          
        } catch (err) {
          res.status(500).send(err);
        }
      },

};

module.exports = loginController;
