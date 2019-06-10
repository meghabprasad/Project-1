
function callApi (){
    $("#results").empty();
    var startCode = $("#base-input").val().toUpperCase();
    startCode.toUpperCase();
    console.log(startCode);
    var endCode = $("#symbols-input").val().toUpperCase();
    endCode.toUpperCase();
    console.log(endCode);
    
    var queryURL = "https://openexchangerates.org/api/latest.json?app_id=296d12934b28477790da87204c8eae86&base="+startCode+"&symbols="+endCode;
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

$(".btn").on("click", function(event){
    event.preventDefault();
    callApi();
})
