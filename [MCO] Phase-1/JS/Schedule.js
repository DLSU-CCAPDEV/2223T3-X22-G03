function leftClick() {
  btn.style.left = '0';

  var user_location = document.getElementById('user_location');

  user_location.innerHTML = '';

  var option0 = document.createElement('option');
  option0.value = 0;
  option0.innerHTML = 'DLSU MNL -> DLSU LC';

  var option1 = document.createElement('option');
  option1.value = 1;
  option1.innerHTML = 'Paseo -> DLSU LC';

  var option2 = document.createElement('option');
  option2.value = 2;
  option2.innerHTML = 'Carmona -> DLSU LC';

  var option3 = document.createElement('option');
  option3.value = 3;
  option3.innerHTML = 'Pavilion Mall -> DLSU LC';

  var option4 = document.createElement('option');
  option4.value = 4;
  option4.innerHTML = 'Waltermart -> DLSU LC';

  var option5 = document.createElement('option');
  option5.value = 5;
  option5.innerHTML = 'N/A';

  var option = document.createElement('option');
  option.value = '';
  option.setAttribute('selected', true);
  option.setAttribute('disabled', true);
  option.setAttribute('hidden', true);
  option.innerHTML = 'Select Location';

  var option_array = [option, option0, option1, option2, option3, option4, option5];

  for (var i = 0; i < option_array.length; i++) {
    user_location.appendChild(option_array[i]);
  }

  user_location.style.width = '189px';
}

function rightClick() {
  btn.style.left = '160px';

  var user_location = document.getElementById('user_location');

  user_location.innerHTML = '';

  var option0 = document.createElement('option');
  option0.value = 0;
  option0.innerHTML = 'DLSU LC -> DLSU MNL';

  var option1 = document.createElement('option');
  option1.value = 1;
  option1.innerHTML = 'DLSU LC -> Paseo';

  var option2 = document.createElement('option');
  option2.value = 2;
  option2.innerHTML = 'DLSU LC -> Carmona';

  var option3 = document.createElement('option');
  option3.value = 3;
  option3.innerHTML = 'DLSU LC -> Pavilion Mall';

  var option4 = document.createElement('option');
  option4.value = 4;
  option4.innerHTML = 'DLSU LC -> Walter Mart';

  var option5 = document.createElement('option');
  option5.value = 5;
  option5.innerHTML = 'N/A';

  var option = document.createElement('option');
  option.setAttribute('selected', true);
  option.setAttribute('disabled', true);
  option.setAttribute('hidden', true);
  option.innerHTML = 'Select Location';

  var option_array = [option, option0, option1, option2, option3, option4, option5];

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

  const exitTimeSlots = {
    0: ["05:45 AM", "06:15 AM", "07:00 AM", "08:00 AM", "09:00 AM", "11:00 AM", "01:00 PM", "02:30 PM", "03:30 PM", "05:10 PM", "06:15 PM", "07:45 PM"],
    1: ["09:00 AM", "11:30 AM", "04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:45 PM"],
    2: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM"],
    3: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM"],
    4: ["04:45 PM", "05:10 PM", "05:30 PM", "06:00 PM", "07:45 PM"],
    5: ["N/A"],
  }

  const entryTimeSlots = {
    0: ["06:00 AM", "07:30 AM", "09:30 AM", "11:00 AM", "01:00 PM", "02:30 PM", "03:30 PM", "05:10 PM", "06:15 PM", "07:45 PM"],
    1: ["06:00 AM", "06:30 AM", "07:00 AM", "12:15 PM", "01:00 PM", "03:00 PM", "03:30 PM"],
    2: ["06:30 AM"],
    3: ["05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM"],
    4: ["06:30 AM", "07:00 AM"],
    5: ["N/A"],
  }

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




