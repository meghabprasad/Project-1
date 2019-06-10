$("#addStock").on("click", function() {
    if ($("#stockInput").val() != "") {
        var newButton = $("<button>");
        newButton.addClass("stock");
        newButton.html("<strong>" + $('#stockInput').val() + "</strong>");
        newButton.attr("data-stock", $("#stockInput").val());
        $("#buttons").append(newButton);
    }
})

$(document).on("click", ".stock", function() {
    var symbol = $(this).attr("data-stock").toLowerCase();
    var queryURL = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + symbol + "&api_token=NSFmVWD6Ga8k2l24xYG6xmyFgVAzTyMSNeTi5U2oMvQp2LQlu012TwKjhCtD"
    $.ajax({
        url: queryURL, 
        method: "GET"
    })

        .then(function(response) {
            console.log(response);
        });
})