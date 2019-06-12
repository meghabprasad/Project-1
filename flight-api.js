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


})


$("#to").on("click",function(){
  
  $(".graph").empty();

  var departDate=$("#departDate").val()
  console.log(departDate)

  
var queryURL="http://min-prices.aviasales.ru/calendar_preload?origin="+origin+"&destination="+ destination+"&depart_date="+ departDate +"&one_way=false&currency=usd&show_to_affiliates=false"

$.ajax({
  url:queryURL,
  method:"GET"
}).then(function(response){

  console.log(queryURL);
  console.log(response);

  for(var i = 0; i<5;i++){
    console.log(response.current_depart_date_prices)
    var result=response.current_depart_date_prices
      tr=$("<tr>");
      // console.log(tr)
      tr.attr("class","graph");
      tr.append("<td>"+result[i].value.toFixed(2));
      tr.append("<td>"+result[i].return_date+"</td>");
      console.log(typeof(tr));
      tr.append("<td>"+result[i].gate+"</td>");
      tr.append("<td>"+result[i].number_of_changes+"</td>");
      $("#flightPrices").append(tr)

  console.log(result[i].return_date);
  console.log(result[i].value)
  console.log(result[i].gate)
  console.log(result[i].number_of_changes)
  
    
  // $("#flightPrices").append("<td class='well'>"+ result[i].value.toFixed(2)+ "</td>"+"<td class='member-name'>" +result[0].return_date + " </td>"+ "<td class='member-role'>" +result[0].gate+" </td>" + "<td class='member-startDate'>"+ result[0].number_of_changes +"</td>");
  

  
  // $("#flightPrices").append("<tr<td class='well'>"+ result[1].value.toFixed(2)+ "</td>" +"<td class='member-name'>" +result[1].return_date + " </td>" + "<td class='member-role'>"+result[1].gate+" </td> <td class='member-startDate'>"+ result[1].number_of_changes + "</td>></tr>");


  


  }
})



})


