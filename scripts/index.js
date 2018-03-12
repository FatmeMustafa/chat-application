$(function() {

let config = {
    apiKey: "AIzaSyAn9NuvsF2kiWAgcB4yrXqwJKHK-ZCFEL8",
    authDomain: "chat.firebaseapp.com",
    projectId: "chat-f2bf0"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

let firebaseUser;

/***********************Showing And Hiding Elements**********************/

$("#register").on("click", function () {        //showing registration page when clicking the registration button.  
    $("#registrationForm").show();
    $(".landingpagesection").hide();
    $(".lobbyRoom").hide();
    $(".chatRoom").hide();
});

$(".back").on("click", function () {        //showing landing page when clicking the back button.
    $("#registrationForm").hide();
    $("#loginForm").hide();
    $(".landingpagesection").show();
    $(".lobbyRoom").hide();
    $(".chatRoom").hide();
});

$("#login").on("click", function () {       //showing login page when clicking the login button.  
    $("#loginForm").show();
    $(".landingpagesection").hide();
    $(".lobbyRoom").hide();
    $(".chatRoom").hide();
});

$("#chatroom1").on("click", function() {        //showing chatroom1 page when clicking the chatroom1 button.
    $(".landingpagesection").hide();
    $("#registrationForm").hide();
    $("#loginForm").hide();
    $(".lobbyRoom").hide();
    $(".chatRoom").show();
});

$(".backLobby").on("click", function() {        //showing lobby page when clicking the back button.
    $(".landingpagesection").hide();
    $("#registrationForm").hide();
    $("#loginForm").hide();
    $(".lobbyRoom").show();
    $(".chatRoom").hide();
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
    usersEmail = $("#email").val(); //IF EMAIL ALREADY EXISTS! CHANGE!
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

firebase.auth().onAuthStateChanged(_firebaseUser => {
    firebaseuser=_firebaseUser;
    if (firebaseUser) {
      console.log(firebaseUser.email);
        console.log("YOU ARE LOGGED IN!");
        $("#loggedInUser").text(`logged in as "${firebaseUser.email}"`)

//        let LoggedInUser = $("#loggedInUser").val()
       $(".landingpagesection").hide();
       $("#registrationForm").hide();
       $("#loginForm").hide();
       $(".lobbyRoom").show();
       $(".chatRoom").hide();
    } else {
        console.log("not logged in!");
        $(".lobbyRoom").hide();
        $(".chatRoom").hide();
    }
});


/************chatroom event*********************/


/*$(".send").on("click", function() {    
    let currentUser = firebaseUser.email;
    let currentText = $(".message").val();
    //config.databaseURL.push({user: currentUser, text: currentText});
    db.push({user: currentUser, text: currentText});
    currentText.val("");
});*/

$(".send").on("click", function() { 
    //console.log(usersEmail)
    db.collection("messages").add({
        text: $(".message").val(),
        user: firebaseUser.email
    })
});




/***********************************************/

$(".logout").on("click", e => {
    firebase.auth().signOut();
    $(".landingpagesection").show();

});


/**************************LOBBY*****************************************/



/*************************Validating Login Form*************************/

$("#loginBTN").on("click", function (e) {
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
    if (usersUsernameLogin === "" || isNaN(usersUsernameLogin) === false ||
    usersPasswordLogin === "" || usersPasswordLogin.length < 6) {     //checks if the input fields fulfils the specified requirements.
        $("#loginMessage").text("Please fill in the required fields.");
        $("#loginMessage").css({"color": "red"});
    } else {
        $("#loginMessage").text("Welcome back!");
        $("#loginMessage").css({"color": "green"});
    }
const auth = firebase.auth();
const promise = auth.signInWithEmailAndPassword(usersUsernameLogin, usersPasswordLogin);

});

/*************************TEEEEEEEEEEEST*************************/



});