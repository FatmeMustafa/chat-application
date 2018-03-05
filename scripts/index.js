$(function() {

/***********************Showing Registration Form***********************/

$("#register").on("click", function () {       //REGISTER button.  
    $("#registrationForm").show();
    $(".landingpagesection").hide();
});

$(".back").on("click", function () {        //BACK button.
    $("#registrationForm").hide();
    $(".landingpagesection").show();
});

/*********************Validating Registration Form**********************/

$("#registerBTN").on("click", function () {

let usersUsername = $("#userName").val();
    if (usersUsername === "" || isNaN(usersUsername) === false) {       //checks if input field is missing or is a number.
        $("#error1").text(" *");
        $("#userName").css({"borderColor": "red"});
    } else {
        $("#error1").text("");
        $("#userName").css({"borderColor": "#ccc"});
    }     
let usersFullName = $("#fullName").val();          
    if (usersFullName === "" || isNaN(usersFullName) === false || usersFullName.split(" ").length === 1) {      //checks if input field is missing, is a number or contains two strings.  
        $("#error2").text(" *");
        $("#fullName").css({"borderColor": "red"});
    } else {
        $("#error2").text("");
        $("#fullName").css({"borderColor": "#ccc"});
    }
let usersEmail = $("#email").val(); 
    if (usersEmail === "" || usersEmail != usersEmail.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {     //checks if the input field is missing or contains an invalid email adress.
        $("#error3").text(" *");
        $("#email").css({"borderColor": "red"});
    } else {
        $("#error3").text("");
        $("#email").css({"borderColor": "#ccc"});
    }
let usersPassword = $("#password").val();
    if (usersPassword === "" || usersPassword.length < 6) {     //checks if the input field is missing or has a password below 6 charecters
        $("#error4").text(" *");
        $("#password").css({"borderColor": "red"});
    } else {
        $("#error4").text("");
        $("#password").css({"borderColor": "#ccc"});
    }
let usersRegistrationMessage = $("#registrationMessage")
    if (usersUsername === "" || isNaN(usersUsername) === false ||
    usersFullName === "" || isNaN(usersFullName) === false || usersFullName.split(" ").length === 1 ||
    usersEmail === "" || usersEmail != usersEmail.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) ||
    usersPassword === "" || usersPassword.length < 6) {
        $("#registrationMessage").text("Please fill in the required fields.");
        $("#registrationMessage").css({"color": "red"});
    } else {
        $("#registrationMessage").text("Thank you for joining us at SmartTalk!");
        $("#registrationMessage").css({"color": "green"});
    }
});

});