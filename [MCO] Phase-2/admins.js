const db = require('./models/db.js');
const Admin = require('./models/admindb.js');

db.connect();

var user = {
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@gmail.com',
  idNumber: '99999999',
  password: 'admin',
  securityCode: '1234',
  designation: 'Faculty',
  passengerType: 'Employee'
};

var result = db.insertOne(Admin, user);
console.log('User successfully added');


var user = {
    firstName: 'Maui',
    lastName: 'Lopez',
    email: 'maui@gmail.com',
    idNumber: '12177539',
    password: 'maui',
    securityCode: '1234',
    designation: 'Faculty',
    passengerType: 'Employee'
};

var result = db.insertOne(Admin, user);
console.log('User successfully added');


var user = {
    firstName: 'Benmar',
    lastName: 'Ramirez',
    email: 'benmar@gmail.com',
    idNumber: '12116866',
    password: 'benmar',
    securityCode: '1234',
    designation: 'Faculty',
    passengerType: 'Employee'
};

var result = db.insertOne(Admin, user);
console.log('User successfully added');


var user = {
    firstName: 'Nathan',
    lastName: 'Asnan',
    email: 'asnan@gmail.com',
    idNumber: '12043338',
    password: 'nathan',
    securityCode: '1234',
    designation: 'Faculty',
    passengerType: 'Employee'
};

var result = db.insertOne(Admin, user);
console.log('User successfully added');


var user = {
    firstName: 'IT',
    lastName: 'IT',
    email: 'it@gmail.com',
    idNumber: '11111111',
    password: 'itadmin',
    securityCode: '1234',
    designation: 'Faculty',
    passengerType: 'Employee'
};

var result = db.insertOne(Admin, user);
console.log('User successfully added');