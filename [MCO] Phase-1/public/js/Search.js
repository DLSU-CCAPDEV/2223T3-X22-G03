class dummyUser_storage {
    constructor(firstName, lastName, email, idNumber, password, designation, passengerType, htmlLink) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.idNumber = idNumber;
      this.password = password;
      this.designation = designation;
      this.passengerType = passengerType;
      this.fullName = firstName + " " + lastName;
      this.htmlLink = htmlLink;
    }

    getEmail() {
      return this.email;
    }

    getIdNumber() {
      return this.idNumber;
    }

    getPassword() {
      return this.password;
    }

    getFirstName() {
      return this.firstName;
    }

    getLastName() {
      return this.lastName;
    }

    getDesignation(){
      return this.designation;
    }

    getPassengerType(){
      return this.passengerType;
    }

}

var registerdUserCount = localStorage.length; //For key in local storage

function create_User(){ //Hard-coded dummy searchable profiles

    var user0 = new dummyUser_storage("Shin", "Ryujin", "shinryujin@gmail.com", "12145678", "ryujin", "Student", "Student", "Temp/TempProfile/DummyProfile4.html");
    var user1 = new dummyUser_storage("Maui", "Lopez", "maui@gmail.com", "12177539", "maui", "Student", "Student", "Temp/TempProfile/DummyProfile1.html");
    var user2 = new dummyUser_storage("Benmar", "Ramirez", "benmar@gmail.com", "12116866", "benmar", "Student", "Student", "Temp/TempProfile/DummyProfile3.html");
    var user3 = new dummyUser_storage("Nathan", "Asnan", "asnan@gmail.com", "12043338", "asnan", "Student", "Student", "Temp/TempProfile/DummyProfile2.html");
    var user4 = new dummyUser_storage("Hwang", "Yeji", "hwangyeji@gmail.com", "12245678","yeji", "Student", "Student", "Temp/TempProfile/DummyProfile5.html")

    var userArray = new Array(user0, user1, user2, user3, user4);

    for ( var i = 0; i < userArray.length; i++ ) {
        localStorage.setItem('dummy_user['+i+']' , JSON.stringify(userArray[i]));
    }

}

function clear_User(){
    localStorage.clear();
}

function search_User(searchTerm){
    const resultContainer = document.getElementsByClassName('results_container')[0];
    const userCardTemplate = document.getElementsByTagName('template')[0].content; //Get the template
    var copyUserCardTemplate = document.importNode(userCardTemplate, true); //Copy the document-fragment from the template

    var searchedUser;

    resultContainer.innerHTML = ""; //Clear the result container

    if (searchTerm.trim() === "") { //If the search bar is empty
        console.log("No user found");
        return;
      }

    for ( var i = 0 ; i < localStorage.length ; i++ ) {

        var key = localStorage.key(i); //Get keys from local storage
        searchedUser = localStorage.getItem(key); //Get the item from local storage

        if ( searchedUser && searchedUser.toLowerCase().includes(searchTerm.toLowerCase()) ) {

            var dummyUserStorage = new Array("dummy_user[0]", "dummy_user[1]", "dummy_user[2]", "dummy_user[3]", "dummy_user[4]"); //Hard-coded dummy searchable profiles

            for ( var k = 0; k < dummyUserStorage.length; k++ ) {
                if ( key == dummyUserStorage[k] ) { //To make sure it is only checking the dummy users and not the other keys in local storage
                    var keyItem = localStorage.getItem(key); //Get the item from local storage
                    var keyItemParsed = JSON.parse(keyItem); //Make it to an object
                    copyUserCardTemplate.querySelector(".htmlLink").setAttribute("href", keyItemParsed.htmlLink); //Get the html link from the dummy user
                    copyUserCardTemplate.querySelector(".name").textContent = keyItemParsed.fullName; //Get the full name from the dummy user
                    copyUserCardTemplate.querySelector(".designation").textContent = keyItemParsed.designation; //Get the designation from the dummy user
                    resultContainer.appendChild(copyUserCardTemplate); //Append the template to the result container
                }
            }
        }
        else{
            console.log("No user found");
        }
    }


}