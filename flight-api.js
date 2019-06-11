$(document).ready(function(event){

  

// $("#to").on("click",function(){

  var destination=$("#destination").val().trim();
  var origin=$("#origin").val().trim();
  var departDate=$("#departDate").val().trim();
  // var returnDate=$("#returnDate").val().trim();



// Can not search by Day  
// var queryURL="https://cors-anywhere.herokuapp.com/api.travelpayouts.com/v2/prices/latest?token=9fce94023aebd6561cac3dc4d92c0482&depart_date="+departDate+"&origin=sfo&destination=lax&currency=usd&page=1&limit=30&show_to_affiliates=true&sorting=price&&";


// didnt check but pretty sure you cant search by day
// var queryURL= "https://cors-anywhere.herokuapp.com/api.travelpayouts.com/v1/prices/cheap?month=2019-09-01&origin=sfo&destination=lax&currency=usd&page=1&limit=30&show_to_affiliates=true&sorting=price&token=9fce94023aebd6561cac3dc4d92c0482";




// Can not search by Day
// var queryURL = "https://cors-anywhere.herokuapp.com/api.travelpayouts.com/v1/prices/calendar?token=9fce94023aebd6561cac3dc4d92c0482&depart_date="+ departDate +"&return_date="+ returnDate +"&origin="+ origin +"&destination="+ destination +"&currency=usd"

// var queryURL = "https://cors-anywhere.herokuapp.com/api.travelpayouts.com/data/en/cities.json"

// // Can not search by Day
// var queryURL ="http://map.aviasales.ru/prices.json?origin_iata="+origin+"& depart_date="+departDate+"season&direct=true&one_way=false&no_visa=true&schengen=true&need_visa=true&locale=ru&min_trip_duration_in_days=13&max_trip_duration_in_days=15"




// var queryURL="https://cors-anywhere.herokuapp.com/api.travelpayouts.com/v2/prices/month-matrix?currency=usd&origin="+origin+"&destination="+destination+"&trip_duration=1&show_to_affiliates=true&token=9fce94023aebd6561cac3dc4d92c0482"


// $.ajax({
//     url:queryURL,
//     method:"GET"
//   }).then(function(response){
//     console.log(response);
// })
// })

$("#to").on("click",function(){

  destination=$("#destination").val().trim();
   origin=$("#origin").val().trim();
   departDate=$("#departDate").val().trim();
  // returnDate=$("#returnDate").val().trim();


var queryURL="http://min-prices.aviasales.ru/calendar_preload?origin="+origin+"&destination="+destination+"&depart_date="+departDate+"&one_way=false&currency=usd&show_to_affiliates=false"

$.ajax({
  url:queryURL,
  method:"GET"
}).then(function(response){
  console.log(response);
  // console.log(response.current_depart_date_prices)
  // console.log(response.current_depart_date_prices[0])
  // console.log(response.current_depart_date_prices[0].value)
  // console.log(response.current_depart_date_prices[0].return_date);
  for(var i = 0; i<response.current_depart_date_prices.length;i++){
  console.log(response.current_depart_date_prices[i].return_date);
  console.log(response.current_depart_date_prices[i].value)
  console.log(response.current_depart_date_prices[i].gate)
  console.log(response.current_depart_date_prices[i].number_of_changes)
  }
})



})


})