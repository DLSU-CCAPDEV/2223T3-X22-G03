const db = require('./models/db.js');
const Reservation = require('./models/reservationdb.js');

db.connect();

console.log('about to make reservation');
var rsv = {
  startCampus: 'Laguna',
  date: '2023-07-24',
  entryLoc: 'Carmona -> DLSU LC',
  entryTime: '06:00 AM',
  exitLoc: 'DLSU LC -> DLSU Manila',
  exitTime: '03:00 PM',
  idNumber: '12043338'
};

console.log('Made reservation');

db.insertOne(Reservation, rsv, function(flag) {
	console.log(flag);
    if(flag){
        console.log('Reservation successfully added');
    }
});
console.log('reservation added');

var rsv = {
  startCampus: 'Laguna',
  date: '2023-07-25',
  entryLoc: 'Paseo -> DLSU LC',
  entryTime: '08:00 AM',
  exitLoc: 'DLSU LC -> Carmona',
  exitTime: '04:45 PM',
  idNumber: '12043338'
};

db.insertOne(Reservation, rsv, function(flag) {
    if(flag){
        console.log('Reservation successfully added');
    }
});

var rsv = {
  startCampus: 'Laguna',
  date: '2023-07-26',
  entryLoc: 'Walter Mart -> DLSU LC',
  entryTime: '06:30 AM',
  exitLoc: 'DLSU LC -> Walter Mart',
  exitTime: '04:45 PM',
  idNumber: '12043338'
};

db.insertOne(Reservation, rsv, function(flag) {
    if(flag){
        console.log('Reservation successfully added');
    }
});
