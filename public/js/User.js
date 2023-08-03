function showErrorBox(message) {
  document.getElementById('error_box').style.display = "block";
  $("#error_message").text(message);

  setTimeout(function () {
    document.getElementById('error_box').style.display = "none";
  }, 3000);
}

function showSuccessBox(message) {
  document.getElementById('success_box').style.display = "block";
  $("#success_message").text(message);

  setTimeout(function () {
    document.getElementById('success_box').style.display = "none";
  }, 3000);
}

async function submitForm(event) {
  event.preventDefault();
  const userId = document.getElementById('user_idNumber').value;

  const response = await fetch(`/SignUp/userid=${userId}`);
  const data = await response.json();
  const errorText = document.getElementById('errorText');

  if (data === "unique") {
    //SENDING POST REQUEST TO ADD INFO INTO DATABASE
    //GETTING ALL DATA TO STORE IN DATABASE
    const registerData = {
      "firstName": document.getElementById('user_firstName').value,
      "lastName": document.getElementById('user_lastName').value,
      "email": document.getElementById('user_email').value,
      "idNumber": document.getElementById('user_idNumber').value,
      "password": document.getElementById('user_password').value,
      "securityCode": document.getElementById('user_securityCode').value,
      "designation": document.getElementById('user_designation').value,
      "passengerType": document.getElementById('user_passengerType').value,
    };

    const response = await fetch('/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    if (response.ok) {
      console.log('User successfully added');
      window.location.href = '/Login'; //REDIRECT TO LOGIN IF SUCCESSFUL
      showSuccessBox("Account registered successfully!");
    }
  } else {
    showErrorBox("Data already exists!");
  }
}

function logoutAccount(){
  localStorage.removeItem('loggedInUser');
}


