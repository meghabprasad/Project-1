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

  // FIREBASE AUTH EVENT LISTENER
  // ----------------------------
  // When this page loads, this event will automatically be triggered; it checks to see if there is a user logged in to the Firebase app that's configured on line 31.
  firebase.auth().onAuthStateChanged(function (user) {

    // If there's a user logged in:
    if (user) {

      // log user info to the console
      console.log("user is signed in!");
      console.log("USER: ", user);

      // access logged in user's data
      database.ref("/" + user.uid).once("value").then(function (snapshot) {
        // log all user's info to console
        console.log(snapshot.val());
        // Set text content of header to be user's email that's stored in realtime db
        $("#user").text(snapshot.val().email);
      });

    } else {
      // if no user logged in, then redirect them back to sign in page
      window.location = "loginPage.html";
    }
  });

  // If #sign-out button is clicked:
  $("#sign-out").on("click", function () {

    // Execute Firebase sign out function.
    firebase.auth().signOut()
      .then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
  })