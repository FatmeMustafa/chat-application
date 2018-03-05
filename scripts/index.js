$(function() {

    let config = {
        apiKey: "AIzaSyAn9NuvsF2kiWAgcB4yrXqwJKHK-ZCFEL8",
        authDomain: "chat.firebaseapp.com",
        databaseURL: "https://Chat.firebaseio.com",
      };
      firebase.initializeApp(config);

//     const auth = firebase.auth();
      const db = firebase.database();

     

      
/***********************Showing And Hiding Elements**********************/

$("#register").on("click", function () {       //showing registration page when clicking the registration button.  
    $("#registrationForm").show();
    $(".landingpagesection").hide();
});

$(".back").on("click", function () {        //showing landing page when clicking the back button.
    $("#registrationForm").hide();
    $("#loginForm").hide();
    $(".landingpagesection").show();
});

$("#login").on("click", function () {       //showing login page when clicking the login button.  
    $("#loginForm").show();
    $(".landingpagesection").hide();
});

/*********************Validating Registration Form**********************/

let usersUsername;
let usersFullName;
let usersEmail;
let usersPassword;

$("#registerBTN").on("click", function (e) {

    usersUsername = $("#userName").val();
    if (usersUsername === "" || isNaN(usersUsername) === false) {       //checks if input field is missing or is a number.
        $("#error1").text(" *");
        $("#userName").css({"borderColor": "red"});
    } else {
        $("#error1").text("");
        $("#userName").css({"borderColor": "#ccc"});
    }     
    usersFullName = $("#fullName").val();          
    if (usersFullName === "" || isNaN(usersFullName) === false || usersFullName.split(" ").length === 1) {      //checks if input field is missing, is a number or contains two strings.  
        $("#error2").text(" *");
        $("#fullName").css({"borderColor": "red"});
    } else {
        $("#error2").text("");
        $("#fullName").css({"borderColor": "#ccc"});
    }
    usersEmail = $("#email").val(); 
    if (usersEmail === "" || usersEmail != usersEmail.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {     //checks if the input field is missing or contains an invalid email adress.
        $("#error3").text(" *");
        $("#email").css({"borderColor": "red"});
    } else {
        $("#error3").text("");
        $("#email").css({"borderColor": "#ccc"});
    }
usersPassword = $("#password").val();
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
    usersPassword === "" || usersPassword.length < 6) {     //checks if the input fields fulfils the specified requirements.
        $("#registrationMessage").text("Please fill in the required fields.");
        $("#registrationMessage").css({"color": "red"});
    } else {
        $("#registrationMessage").text("Thank you for joining us at SmartTalk!");
        $("#registrationMessage").css({"color": "green"});
    }
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(usersEmail, usersPassword);


});


firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log("not logged in!");
    }
});



/*************************Validating Login Form*************************/

$("#loginBTN").on("click", function () {
let usersUsernameLogin = $("#userNameLogin").val();
    if (usersUsernameLogin === "" || isNaN(usersUsernameLogin) === false) {       //checks if input field is missing or is a number.
        $("#error1Login").text(" *");
        $("#userNameLogin").css({"borderColor": "red"});
    } else {
        $("#error1Login").text("");
        $("#userNameLogin").css({"borderColor": "#ccc"});
    }
let usersPasswordLogin = $("#passwordLogin").val();
    if (usersPasswordLogin === "" || usersPasswordLogin.length < 6) {     //checks if the input field is missing or has a password below 6 charecters
        $("#error2Login").text(" *");
        $("#passwordLogin").css({"borderColor": "red"});
    } else {
        $("#error2Login").text("");
        $("#passwordLogin").css({"borderColor": "#ccc"});
    }
let usersLoginMessage = $("#loginMessage")
    if (usersUsernameLogtin === "" || isNaN(usersUsernameLogin) === false ||
    usersPasswordLogin === "" || usersPasswordLogin.length < 6) {     //checks if the input fields fulfils the specified requirements.
        $("#loginMessage").text("Please fill in the required fields.");
        $("#loginMessage").css({"color": "red"});
    } else {
        $("#loginMessage").text("Welcome back!");
        $("#loginMessage").css({"color": "green"});
    }
});

/*************************TEEEEEEEEEEEST*************************/



});