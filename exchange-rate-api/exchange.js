
function callApi (){
    $("#results").empty();

    var endCurrency = $(this).attr("data-name");
    console.log(endCurrency);
    
    var queryURL = "https://openexchangerates.org/api/latest.json?app_id=296d12934b28477790da87204c8eae86&symbols="+endCurrency;
    // var queryURL = "https://openexchangerates.org/api/latest.json?app_id=296d12934b28477790da87204c8eae86&base=EUR&symbols=USD";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var conversionValue = response.rates[endCode];
        console.log(response.base);
        console.log(conversionValue);
        var resultsDiv = $("<div>");
        resultsDiv.text("1");
        resultsDiv.text("1 "+startCode+ " is " + conversionValue + " " + endCode);
        $("#results").append(resultsDiv);
    })
}

$("#currencyBtn").on("click", function(event){
    event.preventDefault();
    //console.log(startCode);
    var endCode = $("#symbols-input").val();
    // endCode.toUpperCase();
    console.log("end code: "+endCode);
    
    var newButton = $("<button>");
    newButton.addClass("dropdown-item");
    newButton.attr("type", "button");
    newButton.attr("data-name", endCode)
    newButton.text(endCode);
    $(".dropdown-menu").append(newButton);

})

$(document).on("click", ".dropdown-item", callApi);
