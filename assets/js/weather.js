var cityResultText = $("#cityResult");
var rowCards = $("#rowCards");
var dayForecast = $("#row5day");
var forecastDate = {};
var forecastIcon = {};
var forecastTemp = {};
var forecastWind = {};
var forecastHum = {};
var forecastCity = {};
var APIKey = "&APPID=fb3dd2a5acdd03a900a040c7940d4846&units=imperial";
var url =  "https://api.openweathermap.org/data/2.5/";
var citiesArray = JSON.parse(localStorage.getItem("Saved City")) || [];

$(document).ready(function (){
    var userInput = citiesArray[citiesArray.length - 1];
    forecast(userInput);
});
function currentWeather(userInput) {
   console.log(userInput);
   }

function forecast (userInput) {
    
    rowCards.empty();
    var fore5 = $("<h3>").attr("class", "forecast").text(""); 
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&APPID=fb3dd2a5acdd03a900a040c7940d4846";
    $.ajax({
        url: forecastURL,
    }).then(function(response){
        console.log(response);
        for (var i = 0; i < response.list.length; i += 8){
            
            forecastCity = response.city.name;
            forecastDate[i] = response.list[i].dt_txt;
            forecastIcon[i] = response.list[i].weather[0].icon;
            forecastTemp[i] = response.list[i].main.temp; 
            forecastWind[i] = response.list[i].wind.speed;
            forecastHum[i] = response.list[i].main.humidity;  
            console.log(forecastCity);

            var newCol2 = $("<div>").attr("class", "max-width: 12rem;");
            rowCards.append(newCol2);

            var newDivCard = $("<div>").attr("class", "card text-white bg-primary");
            newDivCard.attr("style", "max-width: 12rem;")
            newCol2.append(newDivCard);

            var newCardBody = $("<div>").attr("class", "card-body");
            newDivCard.append(newCardBody);

            var newH5 = $("<h5>").attr("class", "card-title").text(moment(forecastDate[i]).format("MMM Do"));
            newCardBody.append(newH5);

            var newImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecastIcon[i] + "@2x.png");
            newCardBody.append(newImg);

            var newPTemp = $("<p>").attr("class", "card-text").text("Temp: " + Math.floor(forecastTemp[i]) + "ºF");
            newCardBody.append(newPTemp);

            var newPWind = $("<p>").attr("class", "card-text").text("Wind: " + forecastWind[i] + " MPH");
            newCardBody.append(newPWind);

            var newPHum = $("<p>").attr("class", "card-text").text("Hum: " + forecastHum[i] + "%");
            newCardBody.append(newPHum);

            dayForecast.append(fore5);
            };
            })
        }
function storeData (userInput) {
  var userInput = $("#searchInput").val().trim().toLowerCase();
  var containsCity = false;
  if (citiesArray != null) {
		$(citiesArray).each(function(x) {
			if (citiesArray[x] === userInput) {
				containsCity = true;
			}
		});
	}
	if (containsCity === false) {
        citiesArray.push(userInput);
	}
	localStorage.setItem("Saved City", JSON.stringify(citiesArray));
}

$(".btn").on("click", function (event){
    console.log(event);
    event.preventDefault();
    if ($("#searchInput").val() === "") {
    alert("Please type a userInput to know the current weather");
    } else
    var userInput = $("#searchInput").val().trim().toLowerCase();
    forecast(userInput);
    
    $("#searchInput").val("");
})