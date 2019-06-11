$(document).ready(function(event){


console.log("hi")
$(".current").on("click",function(){
origin =$(this).val()
console.log(this)
console.log(origin);
$("#comingFrom").text(origin);

})

$(".going").on("click",function(){
   destination =$(this).val()
  console.log(this)
  console.log(destination);
  $("#goingTo").text(destination);
  
})




$("#to").on("click",function(){

  var departDate=$("#departDate").val()
  console.log(departDate)

  
var queryURL="http://min-prices.aviasales.ru/calendar_preload?origin="+origin+"&destination="+ destination+"&depart_date="+ departDate +"&one_way=false&currency=usd&show_to_affiliates=false"

$.ajax({
  url:queryURL,
  method:"GET"
}).then(function(response){

  

  for(var i = 0; i<5;i++){
    console.log(response.current_depart_date_prices)
    var result=response.current_depart_date_prices
    

  console.log(result[i].return_date);
  console.log(result[i].value)
  console.log(result[i].gate)
  console.log(result[i].number_of_changes)
  
    
  $("#flightPrices").append("<th class='well'>"+ result[0].value.toFixed(2) +"<th class='member-name'>" +result[0].return_date + " </th><th class='member-role'>" + result[0].gate + "</th><th class='member-startDate'>"+ result[0].number_of_changes + "</th><th class='member-rate'></th>");
  
  $("#flightPrices").append("<tr class='well'>"+ result[0].value.toFixed(2) +"<td class='member-name'>" +result[0].return_date + " </td><td class='member-role'>" + result[0].gate + "</td><td class='member-startDate'>"+ result[0].number_of_changes + "</td><td class='member-rate'></td>");


  }

})



})

})
