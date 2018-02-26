/***********************Showing Registration Form***********************/

let registrationPart = document.getElementById("register");
    registrationPart.addEventListener("click", function() {
    document.getElementsByClassName("landingpagesection")[0].style.display = "none";
    document.getElementById("registrationForm").style.display = "block";    
});

/********************Validating Registration Form**********************/

function formValidation () {
    let userUsername = document.forms["registrationForm"]["userName"].value;
    if (userUsername == "" || isNaN(userUsername) === false) {  //checks if input is missing or is a number
        document.getElementById("error1").innerHTML = "* ";
        document.getElementById("userName").style.borderColor = "red";
    } 
    else {  
        document.getElementById("error1").innerHTML = "";
        document.getElementById("userName").style.borderColor = "#ccc";
    }
    let userFullName = document.forms["registrationForm"]["fullName"].value;
    if (userFullName == "" || isNaN(userFullName) === false) {  
        document.getElementById("error2").innerHTML = "* ";
        document.getElementById("fullName").style.borderColor = "red";
    } 
    else {  
        document.getElementById("error2").innerHTML = "";
        document.getElementById("fullName").style.borderColor = "#ccc";
    }
    let userEmail = document.forms["registrationForm"]["email"].value;
    if (userEmail == "") {  
        document.getElementById("error3").innerHTML = "* ";
        document.getElementById("email").style.borderColor = "red";
    } 
    else {  
        document.getElementById("error3").innerHTML = "";
        document.getElementById("email").style.borderColor = "#ccc";
    }
    let userPassword = document.forms["registrationForm"]["password"].value;
    if (userPassword == "") {  
        document.getElementById("error4").innerHTML = "* ";
        document.getElementById("password").style.borderColor = "red";
    } 
    else {  
        document.getElementById("error4").innerHTML = "";
        document.getElementById("password").style.borderColor = "#ccc";
    }
    if (userUsername == "" || isNaN(userUsername) === false || userFullName == "" || isNaN(userFullName) === false || userEmail == "" || userPassword == "") {
        document.getElementById("registrationMessage").innerHTML = "Please fill in the required fields.";
    }
    else {
        document.getElementById("registrationMessage").innerHTML = "Thanks for registrating!";
        document.getElementById("registrationMessage").style.color = "green";
    }
}
document.getElementById('submitBTN').addEventListener("click", formValidation);