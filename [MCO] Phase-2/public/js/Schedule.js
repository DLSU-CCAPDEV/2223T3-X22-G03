const exitTimeSlots = {
  0: ["05:45 AM", "06:15 AM", "07:00 AM", "08:00 AM", "09:00 AM", 
      "11:00 AM", "01:00 PM", "02:30 PM", "03:30 PM", "05:10 PM", 
      "06:15 PM", "07:45 PM", "N/A"],
  1: ["09:00 AM", "11:30 AM", "04:45 PM", "05:10 AM", "05:30 PM", 
      "06:00 PM", "06:30 PM", "07:00 PM", "07:45 PM", "N/A"],
  2: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM", 
      "N/A"],
  3: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM", 
      "N/A"],
  4: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM", 
      "N/A"],
  5: ["N/A"],
};

const entryTimeSlots = {
  0: ["06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", 
      "08:30 AM", "09:00 AM", "09:30 AM", "10:30 AM", "11:30 AM", 
      "12:30 PM", "01:00 PM", "02:00 PM", "03:00 PM", "03:30 PM",
      "04:40 PM", "N/A"],
  1: ["06:30 AM", "N/A"],
  2: ["05:30 AM", "06:00 AM", "06:30 AM", "07:30 AM", "N/A"],
  3: ["06:30 AM", "07:00 AM", "N/A"],
  4: ["N/A"],
};

function leftClick() {
  btn.style.left = '0';
  var user_location = document.getElementById('user_location');
  user_location.innerHTML = '';

  var option = document.createElement('option');
  option.value = '';
  option.setAttribute('selected', true);
  option.setAttribute('disabled', true);
  option.setAttribute('hidden', true);
  option.innerHTML = 'Select Location';

  var option_array = [option];
  var storage_entry = ["Paseo -> DLSU LC", "Carmona -> DLSU LC", "Pavilion Mall -> DLSU LC", "Walter Mart -> DLSU LC", "N/A"];
  for (var i = 0; i < storage_entry.length; i++) {
    var entry_option = document.createElement('option');
    entry_option.value = i;
    entry_option.innerHTML = storage_entry[i];
    option_array.push(entry_option);
  }

  for (var i = 0; i < option_array.length; i++) {
    user_location.appendChild(option_array[i]);
  }

  user_location.style.width = '189px';
}

function rightClick() {
  btn.style.left = '160px';
  var user_location = document.getElementById('user_location');
  user_location.innerHTML = '';

  var option = document.createElement('option');
  option.setAttribute('selected', true);
  option.setAttribute('disabled', true);
  option.setAttribute('hidden', true);
  option.innerHTML = 'Select Location';

  var option_array = [option];
  var storage_exit = ["DLSU LC -> Yuchenco Bldg. ", "DLSU LC -> Paseo ", "DLSU LC -> Carmona  ", "DLSU LC -> Pavilion Mall ", "DLSU LC -> Walter Mart ", "N/A"];
  for (var i = 0; i < storage_exit.length; i++) {
    var exit_option = document.createElement('option');
    exit_option.value = i;
    exit_option.innerHTML = storage_exit[i];
    option_array.push(exit_option);
  }

  for (var i = 0; i < option_array.length; i++) {
    user_location.appendChild(option_array[i]);
  }
}

function showScheduleForm() {
  var scheduleForm = document.getElementsByClassName('form_box')[0];
  scheduleForm.style.display = 'block';
}

function hideScheduleForm() {
  var scheduleForm = document.querySelector('.form_box');
  scheduleForm.style.display = 'none';
}

function cancelScheduleForm() {
  var scheduleForm = document.getElementsByClassName('form_box')[0];
  scheduleForm.style.display = '';
}

function changeTimeSlots() {
  var user_location = document.getElementById('user_location').value;
  var buttonClicked = document.getElementById('btn').style.left === '0px' ? 'entry' : 'exit';

  var container = document.getElementById('user_location');
  container.style.width = '188px';

  // const exitTimeSlots = {
  //   0: ["05:45 AM", "06:15 AM", "07:00 AM", "08:00 AM", "09:00 AM", "11:00 AM", "01:00 PM", "02:30 PM", "03:30 PM", "05:10 PM", "06:15 PM", "07:45 PM"],
  //   1: ["09:00 AM", "11:30 AM", "04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:45 PM"],
  //   2: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM"],
  //   3: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM"],
  //   4: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM"],
  //   5: ["N/A"],
  // }

  // const entryTimeSlots = {
  //   0: ["06:00 AM", "07:30 AM", "09:30 AM", "11:00 AM", "01:00 PM", "02:30 PM", "03:30 PM", "05:10 PM", "06:15 PM", "07:45 PM"],
  //   1: ["06:00 AM", "06:30 AM", "07:00 AM", "12:15 PM", "01:00 PM", "03:00 PM", "03:30 PM"],
  //   2: ["06:30 AM"],
  //   3: ["05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM"],
  //   4: ["06:30 AM", "07:00 AM"],
  //   5: ["N/A"],
  // }

  var timeSlots = document.getElementById('user_entryTime');
  timeSlots.innerHTML = '<option value="" disabled selected hidden s> Time Slot </option>';

  var selectedTimeSlots = buttonClicked === 'entry' ? entryTimeSlots[user_location] : exitTimeSlots[user_location];

  for (var i = 0; i < selectedTimeSlots.length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.innerHTML = selectedTimeSlots[i];
    timeSlots.appendChild(option);
  }
}

function findMatchingSeats(event) {
  event.preventDefault();
  var user_location = document.getElementById('user_location').value;
  var user_entryTime = document.getElementById('user_entryTime').value;
  var buttonClicked = document.getElementById('btn').style.left === '0px' ? 'entry' : 'exit';

  var filteredCombinations = combinations.filter(function(combination) {
    return (
      combination.location === user_location &&
      combination.entryTime === user_entryTime &&
      combination.buttonClicked === buttonClicked
    );
  });
  

  if (filteredCombinations.length > 0) {
    var matchedCombination = filteredCombinations[0];
    var scheduleLabel = document.getElementById('schedule_label');
    scheduleLabel.textContent = matchedCombination.message;
    generateSeats(matchedCombination);
    return true;
  }

  alert('Error: No matching schedule found');
  return false;
}

function generateSeats(combination) {
  var seatContainer = document.getElementById('seat_container');
  seatContainer.innerHTML = '';

  var maxCapacity = 13; 

  for (var i = 0; i < maxCapacity; i++) {
    var seatSquare = document.createElement('div');
    seatSquare.classList.add('seat');
    seatSquare.textContent = 'Seat ' + (i + 1);
    seatContainer.appendChild(seatSquare);
  }

  var seats = seatContainer.getElementsByClassName('seat');

  for (var i = 0; i < combination.seats.length; i++) {
    if (combination.seats[i].taken) {
      seats[i].classList.add('taken');
    }
  }
  
    var div = document.createElement('div');
    div.className = 'viewed_schedule';
  
    scheduleContainer.appendChild(div);

    scheduleForm,addEventListener('submit', function(e) {
        e.preventDefault();
    })

    scheduleForm.style.display = 'none';
}

var combinations = [

//ENTRY  
  //MANILA
  {
    location: '0',
    entryTime: '0',
    buttonClicked: 'entry',
    message: 'From DLSU MNL to DLSU LC 06:00 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  {
    location: '0',
    entryTime: '1',
    buttonClicked: 'entry',
    message: 'From DLSU MNL to DLSU LC 07:30 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  //PASEO
  {
    location: '1',
    entryTime: '0',
    buttonClicked: 'entry',
    message: 'From Laguna Central to DLSU LC 06:00 AM',
    seats: [
      { number: 1, taken: true },
      { number: 2, taken: true },
      { number: 3, taken: true },
      { number: 4, taken: true },
      { number: 5, taken: false },
      { number: 6, taken: false },
      { number: 7, taken: false },
      { number: 8, taken: false },
      { number: 9, taken: false },
      { number: 10, taken: false },
      { number: 11, taken: false },
      { number: 12, taken: false },
      { number: 13, taken: false },
    ],
  },

  {
    location: '1',
    entryTime: '1',
    buttonClicked: 'entry',
    message: 'From Laguna Central to DLSU LC 06:30 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  //CARMONA
  {
    location: '2',
    entryTime: '0',
    buttonClicked: 'entry',
    message: 'From Carmona to DLSU LC 06:30 AM',
    seats: [
      { number: 1, taken: true },
      { number: 2, taken: true },
      { number: 3, taken: true },
      { number: 4, taken: true },
      { number: 5, taken: false },
      { number: 6, taken: false },
      { number: 7, taken: false },
      { number: 8, taken: false },
      { number: 9, taken: false },
      { number: 10, taken: false },
      { number: 11, taken: false },
      { number: 12, taken: false },
      { number: 13, taken: false },
    ],
  },

  //PAVILION
  {
    location: '3',
    entryTime: '0',
    buttonClicked: 'entry',
    message: 'From Pavilion to DLSU LC 05:30 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  {
    location: '3',
    entryTime: '1',
    buttonClicked: 'entry',
    message: 'From Pavilion to DLSU LC 06:00 AM',
    seats: [
      { number: 1, taken: true },
      { number: 2, taken: true },
      { number: 3, taken: true },
      { number: 4, taken: true },
      { number: 5, taken: false },
      { number: 6, taken: false },
      { number: 7, taken: false },
      { number: 8, taken: false },
      { number: 9, taken: false },
      { number: 10, taken: false },
      { number: 11, taken: false },
      { number: 12, taken: false },
      { number: 13, taken: false },
    ],
  },

  //WALTERMART
  {
    location: '4',
    entryTime: '0',
    buttonClicked: 'entry',
    message: 'From Pavilion to DLSU LC 06:30 AM',
    seats: [
      { number: 1, taken: true },
      { number: 2, taken: true },
      { number: 3, taken: true },
      { number: 4, taken: true },
      { number: 5, taken: false },
      { number: 6, taken: false },
      { number: 7, taken: false },
      { number: 8, taken: false },
      { number: 9, taken: false },
      { number: 10, taken: false },
      { number: 11, taken: false },
      { number: 12, taken: false },
      { number: 13, taken: false },
    ],
  },

  {
    location: '4',
    entryTime: '1',
    buttonClicked: 'entry',
    message: 'From Pavilion to DLSU LC 07:00 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

//EXIT  
  //LAGUNA
  {
    location: '0',
    entryTime: '0',
    buttonClicked: 'exit',
    message: 'From DLSU LC to MNL 05:45 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  {
    location: '0',
    entryTime: '1',
    buttonClicked: 'exit',
    message: 'From DLSU LC to MNL 06:15 AM',
    seats: [
      { number: 1, taken: true },
      { number: 2, taken: true },
      { number: 3, taken: true },
      { number: 4, taken: true },
      { number: 5, taken: false },
      { number: 6, taken: false },
      { number: 7, taken: false },
      { number: 8, taken: false },
      { number: 9, taken: false },
      { number: 10, taken: false },
      { number: 11, taken: false },
      { number: 12, taken: false },
      { number: 13, taken: false },
    ],
  },

  //PASEO
  {
    location: '1',
    entryTime: '0',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Paseo 09:00 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  {
    location: '1',
    entryTime: '1',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Paseo 11:30 AM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  //CARMONA
  {
    location: '2',
    entryTime: '0',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Carmona 04:45 PM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  {
    location: '2',
    entryTime: '1',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Carmona 05:10 PM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  //PAVILION
  {
    location: '3',
    entryTime: '0',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Pavilion Mall 04:45 PM',
    seats: [
      { number: 1, taken: true },
      { number: 2, taken: true },
      { number: 3, taken: true },
      { number: 4, taken: true },
      { number: 5, taken: false },
      { number: 6, taken: false },
      { number: 7, taken: false },
      { number: 8, taken: false },
      { number: 9, taken: false },
      { number: 10, taken: false },
      { number: 11, taken: false },
      { number: 12, taken: false },
      { number: 13, taken: false },
    ],
  },

  {
    location: '3',
    entryTime: '1',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Pavilion Mall 05:10 PM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  //WALTERMART
  {
    location: '4',
    entryTime: '0',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Waltermart 04:45 PM',
    seats: Array.from({ length: 13 }, (_, i) => ({ number: i + 1, taken: false }))
  },

  {
    location: '4',
    entryTime: '1',
    buttonClicked: 'exit',
    message: 'From DLSU LC to Waltermart 05:10 PM',
    seats: [
      { number: 1, taken: true },
      { number: 2, taken: true },
      { number: 3, taken: true },
      { number: 4, taken: true },
      { number: 5, taken: false },
      { number: 6, taken: false },
      { number: 7, taken: false },
      { number: 8, taken: false },
      { number: 9, taken: false },
      { number: 10, taken: false },
      { number: 11, taken: false },
      { number: 12, taken: false },
      { number: 13, taken: false },
    ],
  },
];




