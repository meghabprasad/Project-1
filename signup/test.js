
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC0zlbQ6ZqjtRgB0K2WNtTrxqyZOv_zqKo",
    authDomain: "finfo-81f61.firebaseapp.com",
    databaseURL: "https://finfo-81f61.firebaseio.com",
    projectId: "finfo-81f61",
    storageBucket: "",
    messagingSenderId: "606365655397",
    appId: "1:606365655397:web:75ced34361481613"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function signinwithfacebook(){

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
};


$("#fb").on("click", signInWithPopup())



