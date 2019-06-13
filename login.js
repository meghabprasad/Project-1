// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBefbqzOn-x0T7jfEfveEuQZ5JnNgw28MA",
    authDomain: "login-test-e8efe.firebaseapp.com",
    databaseURL: "https://login-test-e8efe.firebaseio.com",
    projectId: "login-test-e8efe",
    storageBucket: "login-test-e8efe.appspot.com",
    messagingSenderId: "962526021188",
    appId: "1:962526021188:web:cc26c4d8b489f2a5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
 var database = firebase.database();
 
 // SIGN UP
 // -------
 // When #sign-up button is clicked:
 $("#sign-up").on("click", function (event) {
    event.preventDefault();
 
    // get email and password values of text inputs
    var email = $("#su-email").val().trim()
    var password = $("#su-password").val().trim()
 
    // pass email and password to Firebase's sign up function
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (response) {
            // response only comes if sign up succeeds
            console.log("SIGN UP: ", response);
            // redirect page to "redirect.html" file
 
            // When new user is created, sets their email to database at path defined by their user ID
            database.ref("/" + response.user.uid).set({
                email: response.user.email
            })
                .then(function () {
                    // After it's done setting to database, redirect to other page
                    window.location = "index.html";
                })
        })
        .catch(function (error) {
            // If email is already taken, error message indicating this will be logged to console (you could display it to the HTML instead)
            console.log(error.message);
        });
 })
 
 // SIGN IN
 // -------
 // When #sign-up button is clicked, pulls values of text inputs and passes them to Firebase's createUserWithEmailAndPassword function
 $("#sign-in").on("click", function (event) {
    event.preventDefault();
 
    // get email and password values of text inputs
    var email = $("#si-email").val().trim()
    var password = $("#si-password").val().trim()
 
    // pass email and password to Firebase's sign in function
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (res) {
            // response only comes if sign in succeeds
            console.log("SIGN IN: ", res);
            // redirect page to "redirect.html" file
            window.location = "website.html";
        })
        .catch(function (error) {
            // Dynamically responds with appropriate error message (e.g. "Email format invalid", "Incorrect password", "User does not exist", etc.)
            console.log(error.message);
        });
 })
 // })
 
 
 
 
 
 
     // function signInWithFacebook(){
 
     //     var provider = new firebase.auth.FacebookAuthProvider();
 
     //     firebase.auth().signInWithPopup(provider).then(function (result) {
     //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
     //         var token = result.credential.accessToken;
     //         // The signed-in user info.
     //         var user = result.user;
     //         // ...
     //     }).catch(function (error) {
     //         // Handle Errors here.
     //         var errorCode = error.code;
     //         var errorMessage = error.message;
     //         // The email of the user's account used.
     //         var email = error.email;
     //         // The firebase.auth.AuthCredential type that was used.
     //         var credential = error.credential;
     //         // ...
     //     });
     // };
 
 
     // $("#fb").on("click", signInWithFacebook)