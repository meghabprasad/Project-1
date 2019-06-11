var currentName;

$("#addStock").on("click", function() {
    if ($("#stockInput").val() != "") {
        // var newButton = $("<button>");

        // newButton.addClass("stock");
        // newButton.html("<strong>" + $('#stockTickerInput').val() + ":" +  "</strong>");
        // newButton.attr("data-stock", $("#stockInput").val());
        // $("#buttons").append(newButton);
        
        var newDropDown = $("<button class='dropdown-item stock' type='button'>" + $("#stockNameInput").val() + ": " + $("#stockTickerInput").val() + "</button>");
        newDropDown.attr("data-name", $("#stockNameInput").val());
        newDropDown.attr("data-ticker", $("#stockTickerInput").val());
        $("#menu").append(newDropDown);
    }
})

$(document).on("click", ".stock", function() {
    console.log("data-ticker");
    console.log($(this).attr("data-ticker"));
    var symbol = $(this).attr("data-ticker").toUpperCase();
    var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + symbol + "&api_token=NSFmVWD6Ga8k2l24xYG6xmyFgVAzTyMSNeTi5U2oMvQp2LQlu012TwKjhCtD";
    currentName = $(this).attr("data-name");
    $.ajax({
        url: queryURL, 
        method: "GET"
    })

        .then(function(response) {
            console.log(response);
            var newElem = $("<div>");
            console.log("Name");
            console.log(response.data[0].name);
            newElem.append($("<h1>" + response.data[0].name + "</h1>"));
            console.log("This");
            console.log(this);
            newElem.append($("<img src = 'https://logo.clearbit.com/" + currentName + ".com'>"));
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

// $("#buttons").append($("<h1>Hello!</h1>"));



//logo API key sk_d400cf587ab785dbd12541eeeab3a581