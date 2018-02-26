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
        document.getElementById("error1").innerHTML = "*";
    } 
    else {  
        document.getElementById("error1").innerHTML = "";
    }
    let userFullName = document.forms["registrationForm"]["fullName"].value;
    if (userFullName == "" || isNaN(userFullName) === false) {  
        document.getElementById("error2").innerHTML = "*";
    } 
    else {  
        document.getElementById("error2").innerHTML = "";
    }
    let userEmail = document.forms["registrationForm"]["email"].value;
    if (userEmail == "") {  
        document.getElementById("error3").innerHTML = "*";
    } 
    else {  
        document.getElementById("error3").innerHTML = "";
    }
    let userPassword = document.forms["registrationForm"]["password"].value;
    if (userPassword == "") {  
        document.getElementById("error4").innerHTML = "*";
    } 
    else {  
        document.getElementById("error4").innerHTML = "";
    }
    if (userUsername == "" || isNaN(userUsername) === false || userFullName == "" || isNaN(userFullName) === false || userEmail == "" || userPassword == "") {
        document.getElementById("registrationMessage").innerHTML = "Please fill in the required fields marked with *";
    }
    else {
        document.getElementById("registrationMessage").innerHTML = "Thanks for registrating!";
        document.getElementById("registrationMessage").style.color = "green";
    }
}
document.getElementById('submitBTN').addEventListener("click", formValidation);