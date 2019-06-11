
function callApi (){
    $("#results").empty();

    var endCurrency = $(".currency-list").val();
    console.log(endCurrency);
    
    var queryURL = "https://openexchangerates.org/api/latest.json?app_id=296d12934b28477790da87204c8eae86&symbols="+endCurrency;
    // var queryURL = "https://openexchangerates.org/api/latest.json?app_id=296d12934b28477790da87204c8eae86&base=EUR&symbols=USD";
    var logoURL = "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var conversionValue = response.rates[endCurrency];
        console.log(response.base);
        console.log(conversionValue);
        var resultsDiv = $("<div>");
        resultsDiv.attr("style", "text-align: center");
        resultsDiv.text("1");
        resultsDiv.text("1 USD is "+ conversionValue + " " + endCurrency);
        $("#results").append(resultsDiv);
    })

    $.ajax({
        url: logoURL,
        method: "GET"
    }).then(function(response){
        var currencies = JSON.parse(response);
        console.log(currencies);
        //console.log(response);
        //var logo = response[endCurrency].symbol;
        
        console.log(currencies[endCurrency].symbol);
        var logo = currencies[endCurrency].symbol;
        //console.log(logo);
        var logoDiv = $("<div>");
        logoDiv.text(logo);
        logoDiv.attr("style", "text-align: center; font-size: 30px; color: blue;");
        $("#results").append(logoDiv);
    })
}

// $(".currency-list").on("click", function(event){
//     event.preventDefault();
    //console.log(startCode);
    // var symbol = $("#symbols-input").val();
    // // endCode.toUpperCase();
    // console.log("end code: "+symbol);
    
    // var newButton = $("<button>");
    // newButton.addClass("dropdown-item");
    // newButton.attr("type", "button");
    // newButton.attr("data-name", symbol)
    // console.log("data-name: "+newButton.attr("data-name"));
    // newButton.text(symbol);
    // $(".dropdown-menu").append(newButton);
    $.ajax({
        url: "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json",
        method: "GET"
    }).then(function(response){
        var currencies = JSON.parse(response);
        console.log(currencies);

        var keys = Object.keys(currencies)
        // console.log(keys)
        for (var i=0; i<keys.length; i++){
            var newButton = $("<option>");
            //newButton.addClass("dropdown-item");
            //newButton.attr("type", "button");
            newButton.attr("value", keys[i])
            newButton.addClass("currency-option")
            // console.log("data-name: "+newButton.attr("data-name"));
            newButton.text(keys[i]);
            $(".currency-list").append(newButton);     
        }
        //console.log(response);
        //var logo = response[endCurrency].symbol;
        // for (var key in response){
        //         console.log(key);
                // var currencyCode = key.code;
                // console.log("code: "+currencyCode);
                // var newButton = $("<button>");
                // newButton.addClass("dropdown-item");
                // newButton.attr("type", "button");
                // newButton.attr("data-name", currencyCode)
                // console.log("data-name: "+newButton.attr("data-name"));
                // newButton.text(currencyCode);
                // $(".dropdown-menu").append(newButton);
            
        
    })
// })

$(document).on("click", "#addCurrencyBtn", function(event){
    event.preventDefault()
    callApi()
});
