var currentUser;
var uid = "";
var listener;
var stocksList = [];
var placeHolder = {};

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
        if (!("stock" in user)) {
            console.log("We got here");
            // database.ref("/" + user.uid).push({
            //     stocks: "test"
            // })
        }
        currentUser = user;
        uid = currentUser.uid;
        listener = database.ref("/" + uid + "/stocks").on("child_added", function (snapshot) {

            // Display the viewer count in the html.
            // The number of online users is the number of children in the connections list.
            console.log("stocks to follow");
            console.log(snapshot.val());
            console.log("Split String");
            var result = snapshot.val().split(" ");
            console.log(result);
            var finalTicker = result[result.length - 1].toUpperCase();
            result.splice(result.length - 1, 1);
            var name = result.join().replace(",", " ");
            console.log("Name");
            console.log(name);
            var newDropDown = $("<button class='dropdown-item stock' type='button'>" + name + ": " + finalTicker + "</button>");
            newDropDown.attr("data-name", name);
            newDropDown.attr("data-ticker", finalTicker);
            name = name.replace(" ", "");
            $("#menu").append(newDropDown);
            stocksList.push({
                name: name,
                ticker: finalTicker,
            })
            placeHolder[finalTicker] = name;
        });


    } else {
        // if no user logged in, then redirect them back to sign in page
        window.location = "loginPage.html";
    }
    console.log("User stock");
    console.log(currentUser.stock);
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

var currentName;

$("#addStock").on("click", function () {
    if ($("#stockInput").val() != "") {
        // var newButton = $("<button>");

        // newButton.addClass("stock");
        // newButton.html("<strong>" + $('#stockTickerInput').val() + ":" +  "</strong>");
        // newButton.attr("data-stock", $("#stockInput").val());
        // $("#buttons").append(newButton);

        // var newDropDown = $("<button class='dropdown-item stock' type='button'>" + $("#stockNameInput").val() + ": " + $("#stockTickerInput").val() + "</button>");
        // newDropDown.attr("data-name", $("#stockNameInput").val());
        // newDropDown.attr("data-ticker", $("#stockTickerInput").val());
        database.ref("/" + currentUser.uid + "/stocks").push($("#stockNameInput").val() + " " + $("#stockTickerInput").val());
        $("#stockNameInput").val("");
        $("#stockTickerInput").val("");
        // $("#menu").append(newDropDown);
        console.log("Current User");
        console.log(currentUser);
    }
})

$(document).on("click", ".stock", function () {
    $("#companies").empty();
    console.log("data-ticker");
    console.log($(this).attr("data-ticker"));
    var symbol = $(this).attr("data-ticker").toUpperCase();
    var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + symbol + "&api_token=NSFmVWD6Ga8k2l24xYG6xmyFgVAzTyMSNeTi5U2oMvQp2LQlu012TwKjhCtD";
    currentName = $(this).attr("data-name").replace(" ", "");
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log("Response");
            console.log(response);
            var newElem = $("<div>");
            console.log("Name");
            console.log(response.data[0].name);
            newElem.append($("<h1>" + response.data[0].name + "</h1>"));
            console.log("This");
            console.log(this);
            newElem.append($("<img src = 'https://logo.clearbit.com/" + currentName + ".com?size=60'>"));
            newElem.append($("<h3>Yesterday's Closing Price: $" + response.data[0].close_yesterday + "</h3>"));
            newElem.append($("<h3>Current Price: $" + response.data[0].price + "</h3>"));
            // newElem.append($("<h1>" + ))
            $("#companies").append(newElem);
            // $("#buttons").append($("<p>Test</p>"));
            // var newImage = $("<img src='//logo.clearbit.com/spotify.com'>");
            // newImage.append(<p></p>)
            // $("#companies").append(newImage);
        });
})

// $(".refresh").on("click", function() {
//     console.log("This ran");
//     var queryParameter = "";
//     for(var i = 0; i < stocksList.length; i++) {
//         if(i!==0) {
//             queryParameter = queryParameter + "," + stocksList[i].ticker;
//         }
//         else {
//             queryParameter = queryParameter + stocksList[i].ticker;
//         }
//     }
//     console.log("query parameter");
//     console.log(queryParameter);
// })

// $(document).on("click", ".refresh", function () {
//     console.log("This ran");
//     var queryParameter = "";
//     for (var i = 0; i < stocksList.length; i++) {
//         if (i !== 0) {
//             queryParameter = queryParameter + "," + stocksList[i].ticker;
//         }
//         else {
//             queryParameter = queryParameter + stocksList[i].ticker;
//         }
//     }
//     console.log("query parameter");
//     console.log(queryParameter);
//     var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + queryParameter + "&api_token=NSFmVWD6Ga8k2l24xYG6xmyFgVAzTyMSNeTi5U2oMvQp2LQlu012TwKjhCtD";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         .then(function (response) {
//             console.log(response);
//             var stockInfo = [];
//             $("#stockUpdates").empty();
//             for (var i = 0; i < response.data.length; i++) {
//                 stockInfo.push({
//                     name: response.data[i].name,
//                     ticker: response.data[i].ticker,
//                     change: response.data[i].change_pct
//                 })
//                 var clearLogoURL = "https://logo.clearbit.com/" + stocksList[i].name + ".com?size=60'>";
//                 $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[i].name + " has fluctuated " + stockInfo[i].change + " percent.</p></div>");
//             }

//             // var newMessage = $()
//             // var clearLogoURL = "https://logo.clearbit.com/" + stocksList[0].name + ".com?size=60'>";
//             // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
//             // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
//             // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
//             // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");

//         })

// })

$(document).on("click", "#refresh", function () {
    $("#stockUpdates").empty();
    console.log("This ran");
    var tracker = 0;
    console.log("Stocks List");
    console.log(stocksList);
    while (tracker < stocksList.length - 5) {
        var queryParameter = "";
        for (var i = tracker; i < tracker + 5; i++) {
            if (i !== 0) {
                queryParameter = queryParameter + "," + stocksList[i].ticker;
            }
            else {
                queryParameter = queryParameter + stocksList[i].ticker;
            }
        }
        console.log("query parameter");
        console.log(queryParameter);
        var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + queryParameter + "&api_token=NSFmVWD6Ga8k2l24xYG6xmyFgVAzTyMSNeTi5U2oMvQp2LQlu012TwKjhCtD";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log("Response");
                console.log(response);
                var stockInfo = [];
                for (var i = 0; i < response.data.length; i++) {
                    stockInfo.push({
                        name: response.data[i].name,
                        ticker: response.data[i].symbol,
                        change: response.data[i].change_pct
                    })
                    console.log("Placeholder");
                    console.log(placeHolder);
                    console.log("Ticker");
                    var ticker = response.data[i].symbol;
                    console.log(ticker);
                    var clearLogoURL = "https://logo.clearbit.com/" + placeHolder[ticker] + ".com?size=60'>";
                    $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[i].name + " has fluctuated " + stockInfo[i].change + " percent.</p></div>");
                }

                // var newMessage = $()
                // var clearLogoURL = "https://logo.clearbit.com/" + stocksList[0].name + ".com?size=60'>";
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");

            })
            tracker+=5;
    }
    console.log("Tracker");
    console.log(tracker);
    queryParameter = "";
    for (var i = tracker; i < stocksList.length; i++) {
            if (i !== tracker) {
                queryParameter = queryParameter + "," + stocksList[i].ticker;
            }
            else {
                queryParameter = queryParameter + stocksList[i].ticker;
            }
        }
        console.log("query parameter");
        console.log(queryParameter);
        var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + queryParameter + "&api_token=NSFmVWD6Ga8k2l24xYG6xmyFgVAzTyMSNeTi5U2oMvQp2LQlu012TwKjhCtD";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log("Response");
                console.log(response);
                var stockInfo = [];
                for (var i = 0; i < response.data.length; i++) {
                    stockInfo.push({
                        name: response.data[i].name,
                        ticker: response.data[i].symbol,
                        change: response.data[i].change_pct
                    })
                    var ticker = response.data[i].symbol;
                    console.log("Ticker");
                    console.log(ticker);
                    var clearLogoURL = "https://logo.clearbit.com/" + placeHolder[ticker] + ".com?size=60'>";
                    $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[i].name + " has fluctuated " + stockInfo[i].change + " percent.</p></div>");
                }

                // var newMessage = $()
                // var clearLogoURL = "https://logo.clearbit.com/" + stocksList[0].name + ".com?size=60'>";
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");
                // $("#stockUpdates").prepend("<div class='message' style = 'display:flex'><img src='" + clearLogoURL + "<p class ='ml-2'>" + response.data[0].name + " has fluctuated " + stockInfo[0].change + " percent.</p></div>");

            })
    
})



// $("#buttons").append($("<h1>Hello!</h1>"));



//logo API key sk_d400cf587ab785dbd12541eeeab3a581

// console.log("User");
// console.log(currentUser);


    //....

// database.ref("/" + uid + "/stocks").on("child_added", function(snapshot) {

//     // Display the viewer count in the html.
//     // The number of online users is the number of children in the connections list.
//     console.log("stocks to follow");
//     console.log(snapshot.val());
//   });