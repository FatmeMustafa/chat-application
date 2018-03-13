$(function() {

/***************************Initialize Firebase**************************/

let config = {
    apiKey: "AIzaSyAn9NuvsF2kiWAgcB4yrXqwJKHK-ZCFEL8",
    authDomain: "chat.firebaseapp.com",
    projectId: "chat-f2bf0"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
let firebaseUser;

/***************************Online/Offline State**************************/

firebase.auth().onAuthStateChanged(_firebaseUser => {
    firebaseUser = _firebaseUser;
    if (firebaseUser) {
        console.log(firebaseUser.email);
        console.log("YOU ARE LOGGED IN!");
        $("#loggedInUser").text(`logged in as "${firebaseUser.email}"`)
        $(".landingpagesection").hide();
        $("#registrationForm").hide();
        $("#loginForm").hide();
        $(".lobbyRoom").show();
        $(".chatRoom").hide();
    } else {
        console.log("YOU ARE NOT LOGGED IN!");
        $(".lobbyRoom").hide();
        $(".chatRoom").hide();
    }
});

/*******************************Registration*****************************/

$("#register").on("click", function () {        //shows registration-page when registration button is clicked.  
    $("#registrationForm").show();
    $(".landingpagesection").hide();
});

$(".back").on("click", function () {        //shows landing-page when back button is clicked (for both registration-page and login-page).
    $("#registrationForm").hide();
    $("#loginForm").hide();
    $(".landingpagesection").show();
});

$("#registerBTN").on("click", function (e) {        //validates registration-form and registers a new user.
let usersUsername = $("#userName").val();
    if (usersUsername === "" || isNaN(usersUsername) === false) {       //checks if input field is missing or is a number.
        $("#error1").text(" *");
        $("#userName").css({"borderColor": "red"});
    } else {
        $("#error1").text("");
        $("#userName").css({"borderColor": "#ccc"});
    }     
let usersFullName = $("#fullName").val();          
    if (usersFullName === "" || isNaN(usersFullName) === false || usersFullName.split(" ").length === 1) {      //checks if input field is missing, is a number or contains one strings.  
        $("#error2").text(" *");
        $("#fullName").css({"borderColor": "red"});
    } else {
        $("#error2").text("");
        $("#fullName").css({"borderColor": "#ccc"});
    }
let usersEmail = $("#email").val();  
    if (usersEmail === "" || usersEmail != usersEmail.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {     //checks if input field is missing or contains an invalid email adress.
        $("#error3").text(" *");
        $("#email").css({"borderColor": "red"});
    } else {
        $("#error3").text("");
        $("#email").css({"borderColor": "#ccc"});
    }
let usersPassword = $("#password").val();
    if (usersPassword === "" || usersPassword.length < 6) {     //checks if the input field is missing or has a password below 6 charecters.
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
        usersPassword === "" || usersPassword.length < 6) {     //checks if the input fields fulfils all the specified requirements.
        $("#registrationMessage").text("Please fill in the required fields.");
        $("#registrationMessage").css({"color": "red"});
    } else {
        $("#registrationMessage").text("Thank you for joining us at SmartTalk!");
        $("#registrationMessage").css({"color": "green"}); 
        const promise = auth.createUserWithEmailAndPassword(usersEmail, usersPassword);     //registers a user with an email adress and password. 
    }
});

/***********************************Login********************************/

$("#login").on("click", function () {       //shows login-page when login button is clicked.   
    $("#loginForm").show();
    $(".landingpagesection").hide();
});

$("#loginBTN").on("click", function (e) {        //validates login-form and logs in a user.       
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
        usersPasswordLogin === "" || usersPasswordLogin.length < 6) {     //checks if the input fields fulfils all the specified requirements.
        $("#loginMessage").text("Please fill in the required fields.");
        $("#loginMessage").css({"color": "red"});
    } else {
        $("#loginMessage").text("Welcome back!");
        $("#loginMessage").css({"color": "green"});
        const promise = auth.signInWithEmailAndPassword(usersUsernameLogin, usersPasswordLogin);        //logs in a user with an email adress and password.
    }
});

/***********************************Logout*******************************/

$(".logout").on("click", e => {     //logs out a user.
    firebase.auth().signOut();
    $(".landingpagesection").show();
});

/*******************************Chatroom*****************************/

$("#chatroom1").on("click", function() {        //showing chatroom1 page when clicking the chatroom1 button.
    $(".landingpagesection").hide();
    $("#registrationForm").hide();
    $("#loginForm").hide();
    $(".lobbyRoom").hide();
    $(".chatRoom").show();
});

$(".send").on("click", function() { 
    db.collection("messages").add({
    text: $(".message").val(),
    user: firebaseUser.email
})
});

/*******************************Lobbyroom*****************************/

$(".backLobby").on("click", function() {        //showing lobby page when clicking the back button.
    $(".landingpagesection").hide();
    $("#registrationForm").hide();
    $("#loginForm").hide();
    $(".lobbyRoom").show();
    $(".chatRoom").hide();
});

/*******************************Improvements*****************************/

//REGISTRATION: if usersEmail already exists === false.
//LOGIN: if usersUsernameLogin does not exist === false.
//LOGIN: if usersPasswordLogin does not exist === false.

});