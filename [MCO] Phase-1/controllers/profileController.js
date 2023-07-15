const db = require('../models/db.js');

const User = require('../models/userdb.js');

const Admin = require('../models/admindb.js');

const profileController = {

    getProfile: async function (req, res) {
        const query = {idNumber: req.query.idNumber};
      
        const projection = 'idNumber firstName lastName designation passengerType';
      
        const result = await db.findOne(User, query, projection);
      
        if (result != null) {
      
          const details = {
            idNumber: result.idNumber,
            firstName: result.firstName,
            lastName: result.lastName,
            designation: result.designation,
            passengerType: result.passengerType
          };
      
          res.render('Profile', details);
          
        } else {
          res.send('User does not exist.');
        }
    },

    getProfileAdmin: async function (req, res) {
        var query = {idNumber: req.query.idNumber};

        var projection = 'idNumber firstName lastName designation passengerType';

        const result = await db.findOne(Admin, query, projection);
        
        if (result != null) {

            const details = {
                idNumber: result.idNumber,
                firstName: result.firstName,
                lastName: result.lastName,
                designation: result.designation,
                passengerType: result.passengerType
            };

            res.render('ProfileAdmin', details);
        }
        else {
            res.send('User does not exist.');
        }

    },

    postChangePublicInfo: async function (req, res) {
      var query = {idNumber: req.body.idNumber };
      const projection = { idNumber: 1, firstName: 1, lastName: 1, designation: 1, passengerType: 1 };

      const resultUser = await db.findOne(User, query, projection);
      const resultAdmin = await db.findOne(Admin, query, projection);
     
      if (resultUser != null ) {
        await User.updateOne(query, {firstName: req.body.newFirstName, lastName: req.body.newLastName})
        console.log("User public info change successful");
        res.redirect('/Profile?idNumber=' + req.body.idNumber);
      }
      else if (resultAdmin != null ) {
        await Admin.updateOne(query, {firstName: req.body.newFirstName, lastName: req.body.newLastName})
        console.log("Admin user public info change successful");
        res.redirect('/ProfileAdmin?idNumber=' + req.body.idNumber);
      }
      else {
        console.log("User/Admin public info change unsuccessful");
        res.redirect('/Settings?idNumber=' + req.body.idNumber);
      }

    },

    postChangePrivateInfo: async function (req, res) {
      var query = {idNumber: req.body.idNumber };
      const projection = { idNumber: 1, designation: 1};

      const resultUser = await db.findOne(User, query, projection);
      const resultAdmin = await db.findOne(Admin, query, projection);
     
      if (resultUser != null ) {
        await User.updateOne(query, {designation: req.body.newDesignation})
        console.log("User private info change successful");
        res.redirect('/Profile?idNumber=' + req.body.idNumber);
      }
      else if (resultAdmin != null ) {
        await Admin.updateOne(query, {designation: req.body.newDesignation})
        console.log("Admin user private info change successful");
        res.redirect('/ProfileAdmin?idNumber=' + req.body.idNumber);
      }
      else {
        console.log("User/Admin public info change unsuccessful");
        res.redirect('/Settings?idNumber=' + req.body.idNumber);
      }

    },


    postChangePassword: async function (req, res) {
      var query = {idNumber: req.body.idNumber};
      const projection = { idNumber: 1, password: 1 };

      const resultUser = await db.findOne(User, query, projection);
      const resultAdmin = await db.findOne(Admin, query, projection);

      if (resultUser != null && resultUser.password === req.body.oldPassword ) {
        await User.updateOne(query, {password: req.body.newPassword})
        console.log("User password change successful");
        res.redirect('/Profile?idNumber=' + req.body.idNumber);
      }
      else if (resultAdmin != null && resultAdmin.password === req.body.oldPassword) {
        await Admin.updateOne(query, {password: req.body.newPassword})
        console.log("Admin user password change successful");
        res.redirect('/Profile?idNumber=' + req.body.idNumber);
      }
      else {
        console.log("User/Admin password change unsuccessful");
        res.redirect('/Settings?idNumber=' + req.body.idNumber);
      }

    },

    postDeleteAccount: async function (req, res) {
      var query = {idNumber: req.body.idNumber};
      const projection = { idNumber: 1, password: 1 };
    
      const resultUser = await db.findOne(User, query, projection);
      const resultAdmin = await db.findOne(Admin, query, projection);
      
      if (resultUser != null && resultUser.password === req.body.Password ) {
        await User.deleteOne(query);
        console.log("User deleted");
        res.redirect('/?success');
      }
      else if (resultAdmin != null && resultAdmin.password === req.body.Password) {
        await Admin.deleteOne(query);
        console.log("Admin user deleted");
        res.redirect('/?success');
      }
      else {
        console.log("User/Admin not deleted");
        res.redirect('/Settings?idNumber=' + req.body.idNumber);
      }
    }
    
}

module.exports = profileController;