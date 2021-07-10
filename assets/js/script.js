'use strict'
var cityResultText = {};
var rowCards = $("#rowCards");
var dayForecast = $("#row5day");
var forecastDate = {};
var forecastIcon = {};
var forecastTemp = {};
var forecastWind = {};
var forecastHum = {};
var forecastCity = {};
var today = moment().format('MM' + "/" + 'DD' + '/' + 'YYYY');
var APIKey = "&APPID=fb3dd2a5acdd03a900a040c7940d4846&units=imperial";
var url = "https://api.openweathermap.org/data/2.5/";
var citiesArray = JSON.parse(localStorage.getItem("Saved City")) || [];


$(document).ready(function () {

    const changeBackgroundEl = $('.hero');
    const npsKey = 'h6tXDWnmFLuDQHAPIhnXzQKP5pBX66EKu0vrNdFn';
    const searchInput = $('#searchBar');
    const searchSubmit = $('#input-field');

    let parkName;
    let parkCity;
    let weatherCard;
    

    const imgs = ['assets/img/Alaska.jpg', 'assets/img/GrandCanyon.jpg',
        'assets/img/nPark.jpg', 'assets/img/Rockies.jpg', 'assets/img/Yosemite.jpg'];

    changeBackgroundEl.attr('src', `${imgs[0]}`);

    let i = 1;

    // fades out first image
    var timerOut = setTimeout(() => {
        changeBackgroundEl.fadeOut(1000, $);

    }, 7000)

    // call recallTimer every 7 sec


    const recallTimer = () => {

        if (i < 5) {
            // fades in new image
            changeBackgroundEl.attr('src', `${imgs[i]}`).fadeIn(1000, $);
            i++;
            //  fades out the new image after 6 secs
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 7000)
            // else to resets index value.
        } else {
            i = 1
            changeBackgroundEl.attr('src', `${imgs[0]}`).fadeIn(1000, $);
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 7000)
        };

    }

    let internalTimer = setInterval(recallTimer, 8000);


    //  put it inside function to call park info
    function fetchParkData(event) {
        event.preventDefault();
        let currentSearch = searchInput.val();

        fetch(`https://developer.nps.gov/api/v1/parks?q=${currentSearch}&api_key=${npsKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // calling each park name
                data.data.forEach(displayData)

            })
        // search for specific park part
    }


    searchSubmit.submit(fetchParkData);


    // display data acquired from API
    function displayData(park) {
        // console.log(park.name);

        parkName = park.name;

        let parkList = $('#park-list');
        // create div for the column and attach to the main div container
        let item = document.createElement('div');
        item.classList.add('col', 'card', 'custom-card');
        parkList.append(item);

        // div to add the card to
        let cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        item.append(cardContent);


        // create card for each park and attach to park list div
        let itemCard = document.createElement('div');
        itemCard.classList.add('card-title');
        itemCard.textContent = parkName;
        cardContent.append(itemCard);

        // card-action div
        let cardAction = document.createElement('div');
        cardAction.classList.add('card-action');
        cardContent.append(cardAction);

        //create button for each city and attach it to the park name

        let infoBtn = document.createElement('button');
        infoBtn.classList.add('show-modal', 'custom-button');
        infoBtn.textContent = 'More Info';
        cardContent.append(infoBtn);

        // create another card for weather content;

        weatherCard = document.createElement('div');
        weatherCard.classList.add('.card-content')
        item.append(weatherCard);
                
        console.log("CARD:",weatherCard);

        forecast(parkCity);

        // getting activities for each park

        $.getJSON(`https://developer.nps.gov/api/v1/parks?q=${parkName}&api_key=${npsKey}`, function (data) {

            let activities = data.data[0].activities;
            console.log(activities);
            
            // creating a div and adding a list to it with each activity
            let listActivities = document.createElement('div');
            listActivities.classList.add('custom-modal', 'hidden');
            
            // gets activitites from APi and add to the div
            cardContent.append(listActivities);

            for (let i = 0; i < activities.length; i++) {
                let parkActivities = activities[i].name;

                let newActivity = document.createElement('li');
                newActivity.textContent = parkActivities;
                listActivities.append(newActivity);

            }

        })
    }
    $(document).on("click", ".show-modal", function (e) {
        console.log('click, click, clicking ®️Dan');
        e.target.nextSibling.classList.toggle('hidden');
    })
    
// output current weather

$(document).ready(function () {
    var userInput = citiesArray[citiesArray.length - 1];
    var userInput = (forecastCity);
    console.log(userInput,"1th Test");
    forecast(userInput);
    
});
function forecast(userInput) {
    //console.log(userInput);
    rowCards.empty();
    var fore5 = $("<h3>").attr("class", "forecast").text("");

    //the error is here can read name for city
    
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&APPID=fb3dd2a5acdd03a900a040c7940d4846&units=imperial";
    $.ajax({
        url: forecastURL,
    }).then(function (response) {
        
        for (var i = 0; i < response.list.length; i += 8) {

        forecastCity = response.city.name;
        forecastDate[i] = response.list[i].dt_txt;
        forecastIcon[i] = response.list[i].weather[0].icon;
        forecastTemp[i] = response.list[i].main.temp;
        forecastWind[i] = response.list[i].wind.speed;
        forecastHum[i] = response.list[i].main.humidity;
        
            var weatherCard = $("<div>").attr("class", "max-width: 12rem;");
            rowCards.append(weatherCard);

            var newDivCard = $("<div>").attr("class", "card text-white bg-primary");
            newDivCard.attr("style", "max-width: 12rem;")
            weatherCard.append(newDivCard);
        
            var newCardBody = $("<div>").attr("class", "card-body");
            weatherCard.append(newCardBody);

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
        
            weatherCard.append(fore5);
        }
        console.log("Local City:",forecastCity);
        console.log(forecastURL, "test"); 
        });
    }
});

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
    console.log(event,"2");
    event.preventDefault();
    if ($("#searchInput").val() === "") {
    alert("Please type a userInput to know the current weather");
    } else
    var userInput = $("#searchInput").val().trim().toLowerCase();
    forecast(userInput);
    $("#searchInput").val(forecastCity);
})
