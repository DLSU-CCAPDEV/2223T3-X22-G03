
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js')

// import module `loginController` from `../controllers/signupController.js`
const loginController = require('../controllers/loginController.js');

// import module `profileController` from `../controllers/profileController.js`
const profileController = require('../controllers/profileController.js');

const signupController = require('../controllers/signupController.js');

const reservationController = require('../controllers/reservationController.js');

const searchController = require('../controllers/searchController.js');

const app = express();

// Index settings
app.get('/', controller.getIndex);

// Login settings
app.get('/Login', loginController.getLogin);
app.post('/Login', loginController.postLogin);

// Signup settings
app.get('/SignUp', signupController.getSignUp);
app.post('/SignUp', signupController.postSignUp);

// Search settings
app.get('/Search', searchController.getSearch);
app.post('/UserSearch', searchController.postUserSearch);
app.get('/SearchProfile', searchController.getSearchProfile);
app.get('/SearchReservation', searchController.getSearchReservation);

// User profile settings
app.get('/Profile', profileController.getProfile);

// Admin profile settings
app.get('/ProfileAdmin', profileController.getProfileAdmin);

// Profile settings
app.get('/Settings', controller.getSettings);
app.post('/ChangePublicInfo', profileController.postChangePublicInfo);
app.post('/ChangePrivateInfo', profileController.postChangePrivateInfo);
app.post('/ChangePassword', profileController.postChangePassword);
app.post('/DeleteAccount', profileController.postDeleteAccount);

// Schedule
app.get('/Schedule', controller.getSchedule);

// Reservation
app.get('/Reservation', reservationController.getReservations);
app.post('/Reservation', reservationController.postReservations);
//Reservation Update and DeleteAccount
app.post('/ReservationUpdate', reservationController.postUpdateReservations);
app.post('/ReservationDelete', reservationController.postDelete);

// Admin Reservation
app.get('/ReservationAdmin', reservationController.getReservationAdmin);

/*
    exports the object `app` (defined above)
    when another script exports from this file
*/
module.exports = app;