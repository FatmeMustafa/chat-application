$(function() {
    /***************************Initialize Firebase**************************/
    let config = {
        apiKey: "AIzaSyDcawDhzW9PgXitAXRgU37-yuocysAbKow",
        authDomain:"BackupChat.firebaseapp.com",               
        projectId: "backupchat-e4bf2"                           
        };
    firebase.initializeApp(config);
    
    /****************************Global Variables****************************/
    const auth = firebase.auth();       //returns all authentication methods
    const db = firebase.firestore();    //adds firestore to our project through firebase

    let usersCollection = db.collection("users");                //defines a collection in Firestore named "messages"
    let firestoreCollection = db.collection("messages");          //messages from chatroom 1
    let firestoreCollectionTwo = db.collection("messagesTwo");      //messages from chatroom 2
    let firestoreCollectionThree = db.collection("messagesThree");  //messages from chatroom 3
    
    let firebaseUser;   //logged in user 
    let UID;            //specific user ID (UID) (from registration)
    let activeChatroom; // chatroom currently beeing displayed to user
    let rendermes =[];  // messeages beeing rendered to user

    const switchingPages = function(){  //switch between pages
        $("#register").on("click", function () {        //shows registration-page when registration button is clicked.  
            $("#registrationForm").show();
            $(".landingpagesection").hide();
        });
        $(".back").on("click", function () {        //shows landing-page when back button is clicked (for both registration-page and login-page).
            $("#registrationForm").hide();
            $("#loginForm").hide();
            $(".landingpagesection").show();
            $(".lobbyRoom").hide();
        });
        $("#login").on("click", function () {       //shows login-page when login button is clicked.   
            $("#loginForm").show();
            $(".landingpagesection").hide();
            $(".chatRoom").hide();
        });
        $("#chatroom1").on("click", function() {        //showing chatroom1 page when clicking the chatroom1 button.
            $(".lobbyRoom").hide();
            $(".chatRoom").show();
            rendermes=[];                           //empty the rendering list 
            ChatroomHistory(firestoreCollection);   //set the rigt chatroom as a parameter for the render function
            activeChatroom = firestoreCollection;   //set active chatroom to the first chatroom
            db.collection("users").doc(auth.currentUser.uid).update({   //updates following line with server
            location: "chatroom1"});     //Tells where within the site your currently at to the server
        });
        $("#chatroom2").on("click", function () {
            $(".lobbyRoom").hide();
            $(".chatRoom").show();
            rendermes=[];                               //empty the rendering list 
            ChatroomHistory(firestoreCollectionTwo);    //set the rigt chatroom as a parameter for the render function
            activeChatroom = firestoreCollectionTwo;    //set active chatroom to the second chatroom
            db.collection("users").doc(auth.currentUser.uid).update({
            location: "chatroom2"});
        });
        $("#chatroom3").on("click", function () {
            $(".lobbyRoom").hide();
            $(".chatRoom").show();
            rendermes=[];                                //empty the rendering list 
            ChatroomHistory(firestoreCollectionThree);   //set the rigt chatroom as a parameter for the render function
            activeChatroom = firestoreCollectionThree;   //set active chatroom to the third chatroom
            db.collection("users").doc(auth.currentUser.uid).update({
            location: "chatroom3"});
        });
        $(".lobbyRoom").ready(function () {
            $(".chatRoom").hide();
        });
        $(".backLobby").on("click", function() {        //showing lobby page when clicking the back button.
            $(".lobbyRoom").show();
            $(".chatRoom").hide();
            db.collection("users").doc(auth.currentUser.uid).update({
            location: "lobby"});
        });
    };
    const register = function() {    //Click registerBtn
        $("#registerBTN").on("click", function (e) {        //validates registration-form and registers a new user.
        let usersUsername = $("#userName").val();
        let usersFullName = $("#fullName").val();     
        let usersEmail = $("#email").val();
        let usersPassword = $("#password").val();
        let usersRegistrationMessage = $("#registrationMessage");

        if (usersUsername === "" || isNaN(usersUsername) === false) {       //checks if input field is missing or is a number.
            $("#error1").text(" *");
            $("#userName").css({"borderColor": "red"});
        } else {
            $("#error1").text("");
            $("#userName").css({"borderColor": "#ccc"});
        };
        if (usersFullName === "" || isNaN(usersFullName) === false || usersFullName.split(" ").length === 1) {      //checks if input field is missing, is a number or contains one strings.  
            $("#error2").text(" *");
            $("#fullName").css({"borderColor": "red"});
        } else {
            $("#error2").text("");
            $("#fullName").css({"borderColor": "#ccc"});
        };
        if (usersEmail === "" || usersEmail != usersEmail.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {     //checks if input field is missing or contains an invalid email adress.
            $("#error3").text(" *");
            $("#email").css({"borderColor": "red"});
        } else {
            $("#error3").text("");
            $("#email").css({"borderColor": "#ccc"});
        };
        if (usersPassword === "" || usersPassword.length < 6) {     //checks if the input field is missing or has a password below 6 charecters.
            $("#error4").text(" *");
            $("#password").css({"borderColor": "red"});
        } else {
            $("#error4").text("");
            $("#password").css({"borderColor": "#ccc"});
        };
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
                    UID = firebase.auth().currentUser.uid;      //sets the current users ID to the registration ID
                    db.collection("users").doc(auth.currentUser.uid).set({      //sets the usersEmail value and online status to the "users" list  
                        email: usersEmail,
                        loggedin: true,
                        location: "lobby"
                    });
                });
            };
        });
    };
    const login =function(){    //Login
        $("#loginBTN").on("click", function (e) {        //validates login-form and logs in a user.    
            
        let usersUsernameLogin = $("#userNameLogin").val();
        let usersPasswordLogin = $("#passwordLogin").val();
        let usersLoginMessage = $("#loginMessage");
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
            };
            if (usersUsernameLogin === "" || isNaN(usersUsernameLogin) === false ||
                usersPasswordLogin === "" || usersPasswordLogin.length < 6) {     //checks if the input fields fulfils all the specified requirements.
                $("#loginMessage").text("Please fill in the required fields.");
                $("#loginMessage").css({"color": "red"});
            } else {
                $("#loginMessage").text("Welcome back!");
                $("#loginMessage").css({"color": "green"});
                auth.signInWithEmailAndPassword(usersUsernameLogin, usersPasswordLogin)       //logs in a user with an email adress and password.
                .then(() =>  {
                UID = firebase.auth().currentUser.uid;       //sets the current users ID to the registration ID
                })
                .then(() =>  {
                db.collection("users").doc(auth.currentUser.uid).update({    //updates the loggedin value to true
                    loggedin: true,
                    location: "lobby"
                });
            });
            };
        });
    };
    const logout = function(){  //Logout
        $(".logout").on("click", e => {     //logs out a user.
            db.collection("users").doc(auth.currentUser.uid).update({   //updates loggedin value of the user 
                loggedin: false,
                location: "offline"
            })
            .then(() =>  {
                firebase.auth().signOut();      //logs a user out
                $(".landingpagesection").show();
            });
        })
    };
    const AllUsers = function(){ //Displays all users and ther onlinestate
        usersCollection.onSnapshot((snapshot) => {   //shows a snapshot of the users list and updates everytime something new happens 
        usersCollection.get()     //gets all the users and their onlinestate
            .then(users => {
                $("#userState").html(""); //empties all users first
                users.forEach(user => {      
                    if(user.data().loggedin === false ) {
                    }
                    else{
                    let smartTalkUsers = $("<p>").append($("<p>").append(`${user.data().email}`),$("<p>").append(`Online`),$("<p>").append(` at ${user.data().location}`));    // prints messeages to user
                    $("#userState").append(smartTalkUsers);
                    console.log(user.data());
                };
                });
            });
        });
    };
    const loggedInUser = function(){ // Display YOUR username
        firebase.auth().onAuthStateChanged(_firebaseUser => {  //checks the online/offline state of the user
            firebaseUser = _firebaseUser;
            if (firebaseUser) {
                console.log(firebaseUser.email);
                console.log("YOU ARE LOGGED IN!");
                $("#loggedInUser").text(`logged in as: ${firebaseUser.email}`);
                $(".landingpagesection").hide();
                $("#registrationForm").hide();
                $("#loginForm").hide();
                $(".lobbyRoom").show();
                $(".chatRoom").hide();
                $("#userState").show();
                $(".fa-user").show();
                $("#loggedInUser").show();
            } else {
                console.log("YOU ARE NOT LOGGED IN!");
                $(".lobbyRoom").hide();
                $(".chatRoom").hide();
                $("#userState").hide();
                $(".fa-user").hide();
                $("#loggedInUser").hide();
            };
        });
    };
    const render = function(){  // Renders messeages to user
        rendermes.forEach(message => {        
            let timestamp = new Date(message.time);                 //converts millisecond timestamp to date
            let datetime = "Posted: " 
            + timestamp.getDate() + "/"
            + (timestamp.getMonth()+1) + "/"            
            + timestamp.getFullYear() + " "
            + timestamp.getHours() + ":"
            + timestamp.getMinutes();
            let chatmes = $("<p>").append($("<p>").append(datetime),$("<p>").append(message.user),$("<p>").append(message.text)); // prints messeages to user     ***ÄNDRAD**
            $(".chatbox").append(chatmes);
        });
    };
    const sendMessage = function(){  //SendBtn
        $(".send").on("click", function() {
            activeChatroom.add({               //chatroom that user is in and wants to send to
            text: $(".message").val(),
            user: firebaseUser.email,
            time:Date.now()
            });
        $(".message").val("");
        });
    };
    const ChatroomHistory = function(currentChatroom){  // Saves the messagehistory from server to rendermes in order

        currentChatroom.onSnapshot((snapshot) => {
            currentChatroom.get()
            .then(currentChatroom => {     //gets our array list.
                rendermes=[];   //empties the list to be rendered before each new render
                $(".chatbox").html("");                     // empties renderd messeages before updating messeages
                currentChatroom.forEach(message => {        //for every message in the array list it logs array data (user & text & time).
                    let obj ={};                            //collect the data to this object
                    obj["user"] = message.data().user;
                    obj["time"] = message.data().time;
                    obj["text"] = message.data().text;
                    rendermes.push(obj);                    //push the object to the list rendermes                     
                    rendermes.sort(function(ob1, ob2) {
                    return ob1.time - ob2.time;
                    });                                    
                });
                render(rendermes);  //rendering rendermes
            });
        });
    };

    loggedInUser();
    AllUsers();
    switchingPages();
    register();
    login();
    logout();
    sendMessage();
});