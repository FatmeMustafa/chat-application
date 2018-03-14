$(function() {
    
    /***************************Initialize Firebase**************************/
    let config = {
        apiKey: "AIzaSyDcawDhzW9PgXitAXRgU37-yuocysAbKow",      //"AIzaSyAn9NuvsF2kiWAgcB4yrXqwJKHK-ZCFEL8",
        authDomain:"BackupChat.firebaseapp.com",                //"chat.firebaseapp.com",
        projectId: "backupchat-e4bf2"                           //"chat-f2bf0"
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
            $("#loggedInUser").text(`logged in as "${firebaseUser.email}"`);
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
    
    /***************************GETS OLD MESSEAGES**************************/
    
    let firestoreCollection = db.collection("messages");     //defines a collection in Firestore named "messages".      *******change name of "firestoreCollection" to mabye "ChatroomOneCollection"
    db.collection('messages').onSnapshot((snapshot) => {
        snapshot.forEach(message => {
       //console.log(message.data());
    });

        firestoreCollection.get().then(textMessage => {     //gets our array list.
            let timestamp = new Date();               //Shows date instead of milliseconds timestamp
            let datetime = "Posted: "
            + timestamp.getDate() + "/"
            + (timestamp.getMonth()+1) + "/"         //(we say plus 1 because months start with 0.)
            + timestamp.getFullYear() + " "
            + timestamp.getHours() + ":"
            + timestamp.getMinutes();
            $(".chatbox").html("");                 // empties renderd messeages before updating messeages
            textMessage.forEach(textMessage => {        //for every message in the array list it logs array data (user & text).
                //console.log(textMessage.data());
                chatmes = $("<p>").append(`${textMessage.data().user}` + "<br>" + `${textMessage.data().text}`+ "<br>" + `${datetime}`);    // prints messeages to user
                $(".chatbox").append(chatmes);
            });
        });
    });
    
    /****************************Switch Pages***********************************/

    const switchingPages = function(){  //switch between pages
        $("#register").on("click", function () {        //shows registration-page when registration button is clicked.  
            $("#registrationForm").show();
            $(".landingpagesection").hide();
        });
        $(".back").on("click", function () {        //shows landing-page when back button is clicked (for both registration-page and login-page).
            $("#registrationForm").hide();
            $("#loginForm").hide();
            $(".landingpagesection").show();
        });
        $("#login").on("click", function () {       //shows login-page when login button is clicked.   
            $("#loginForm").show();
            $(".landingpagesection").hide();
        });
        $("#chatroom1").on("click", function() {        //showing chatroom1 page when clicking the chatroom1 button.
            $(".lobbyRoom").hide();
            $(".chatRoom").show();
        });
        $(".backLobby").on("click", function() {        //showing lobby page when clicking the back button.
            $(".lobbyRoom").show();
            $(".chatRoom").hide();
        });
    }

    /************************REGISTER*****************************/

    const register = function() {    //Click registerBtn
        $("#registerBTN").on("click", function (e) {        //validates registration-form and registers a new user.
        let usersUsername = $("#userName").val();
        let usersFullName = $("#fullName").val();     
        let usersEmail = $("#email").val();
        let usersPassword = $("#password").val();
        let usersRegistrationMessage = $("#registrationMessage")
        if (usersUsername === "" || isNaN(usersUsername) === false) {       //checks if input field is missing or is a number.
            $("#error1").text(" *");
            $("#userName").css({"borderColor": "red"});
        } else {
            $("#error1").text("");
            $("#userName").css({"borderColor": "#ccc"});
        }     
        if (usersFullName === "" || isNaN(usersFullName) === false || usersFullName.split(" ").length === 1) {      //checks if input field is missing, is a number or contains one strings.  
            $("#error2").text(" *");
            $("#fullName").css({"borderColor": "red"});
        } else {
            $("#error2").text("");
            $("#fullName").css({"borderColor": "#ccc"});
        }
        if (usersEmail === "" || usersEmail != usersEmail.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {     //checks if input field is missing or contains an invalid email adress.
            $("#error3").text(" *");
            $("#email").css({"borderColor": "red"});
        } else {
            $("#error3").text("");
            $("#email").css({"borderColor": "#ccc"});
        }
        if (usersPassword === "" || usersPassword.length < 6) {     //checks if the input field is missing or has a password below 6 charecters.
            $("#error4").text(" *");
            $("#password").css({"borderColor": "red"});
        } else {
            $("#error4").text("");
            $("#password").css({"borderColor": "#ccc"});
        }
        if (usersUsername === "" || isNaN(usersUsername) === false ||
            usersFullName === "" || isNaN(usersFullName) === false || usersFullName.split(" ").length === 1 ||
            usersEmail === "" || usersEmail != usersEmail.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) ||
            usersPassword === "" || usersPassword.length < 6) {     //checks if the input fields fulfils all the specified requirements.
            $("#registrationMessage").text("Please fill in the required fields.");
            $("#registrationMessage").css({"color": "red"});
        } else {
            $("#registrationMessage").text("Thank you for joining us at SmartTalk!");
            $("#registrationMessage").css({"color": "green"}); 
            auth.createUserWithEmailAndPassword(usersEmail, usersPassword)     //registers a user with an email adress and password. 
            
            .then(() =>  {
                
                db.collection("users").doc(auth.currentUser.uid).set({      
                    user: true
                });
            });
        }
    });
            
    }

    /****************************LOGIN*******************************/

    const login =function(){    //Login
        $("#loginBTN").on("click", function (e) {        //validates login-form and logs in a user.       
        let usersUsernameLogin = $("#userNameLogin").val();
        let usersPasswordLogin = $("#passwordLogin").val();
        let usersLoginMessage = $("#loginMessage")
            if (usersUsernameLogin === "" || isNaN(usersUsernameLogin) === false) {       //checks if input field is missing or is a number.
                $("#error1Login").text(" *");
                $("#userNameLogin").css({"borderColor": "red"});
            } else {
                $("#error1Login").text("");
                $("#userNameLogin").css({"borderColor": "#ccc"});
            }
            if (usersPasswordLogin === "" || usersPasswordLogin.length < 6) {     //checks if the input field is missing or has a password below 6 charecters
                $("#error2Login").text(" *");
                $("#passwordLogin").css({"borderColor": "red"});
            } else {
                $("#error2Login").text("");
                $("#passwordLogin").css({"borderColor": "#ccc"});
            }
            if (usersUsernameLogin === "" || isNaN(usersUsernameLogin) === false ||
                usersPasswordLogin === "" || usersPasswordLogin.length < 6) {     //checks if the input fields fulfils all the specified requirements.
                $("#loginMessage").text("Please fill in the required fields.");
                $("#loginMessage").css({"color": "red"});
            } else {
                $("#loginMessage").text("Welcome back!");
                $("#loginMessage").css({"color": "green"});
                auth.signInWithEmailAndPassword(usersUsernameLogin, usersPasswordLogin);        //logs in a user with an email adress and password.
            }
        });
    }

    /********************LOGOUT*****************/

    const logout = function(){  //Logout
        $(".logout").on("click", e => {     //logs out a user.
            firebase.auth().signOut();
            $(".landingpagesection").show();
        });
    }
    
    /**************************SEND MESSAGE**********************************/

    const sendMessage = function(){ //SendBtn
        $(".send").on("click", function() {
            db.collection("messages").add({
            text: $(".message").val(),
            user: firebaseUser.email,
            time:Date.now()
            });
            $(".message").val("");
        });
    }

    switchingPages();
    register();
    login();
    logout();
    sendMessage();
});