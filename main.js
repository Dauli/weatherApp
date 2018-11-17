// Global vaiables
var icon,
	description,
	loc,
	temp,
	wind;


/*
* getting user's geolocation
*/
function updateByGeo (lat, lon) {
	var url = "https://fcc-weather-api.glitch.me/api/current?" +
		"lat=" + lat +
		"&lon=" + lon;

	sendRequest(url);
}

function showPosition (position) {
	updateByGeo(position.coords.latitude, position.coords.longitude);
}


/*
* DOM loading
*/
window.onload = function () {
	icon = document.getElementById("icon");
	description = document.getElementById("description");
	loc = document.getElementById("location");
	temp = document.getElementById("temp");
	wind = document.getElementById("wind");

	// Calling backgroung function
	upgradeBackground();

	// Checking if browser does support geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Sorry, we could not discover your location. Please use Google Chrome!");
	}
}


/*
* HTTP Request
*/
function sendRequest(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);
			
			// we define rendered data in this calling function
			render(data);  
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


/*
* Function of rendering data
*/
function render(data) {
	var cTemp = Math.round(data.main.temp);
	var fTemp = Math.round(cTemp + 32 * 9/5) + "&deg; F";
	var iconW = data.weather[0].icon;
	var descrip = data.weather[0].description;
	var location = data.name + ", " + data.sys.country;
	var windSpeed = data.wind.speed;

	icon.src = iconW;
	temp.innerHTML = cTemp + "&deg; C";
	description.innerHTML = descrip;
	loc.innerHTML = location;
	wind.innerHTML = windSpeed + " m/s";

	// We call the upgrade background function
	upgradeBackground(descrip);

	// Dealing with the toggle between Celsius and Fahrenheit
	var x = document.getElementById("temp");
	x.addEventListener("click", myFunction);
	function myFunction() {
		if (fTemp) {
			x.innerHTML = fTemp;
			fTemp = cTemp + "&deg; C";
		}
	}
}


/*
* Function to upgrade background accordingly
*/
function upgradeBackground(descrip) {
	var now = new Date();
	var hour = now. getHours();
	if (hour > 5 && hour < 18) {
		if (descrip == "clear sky") {
			document.body.style.backgroundImage = "url('images/clear_sky.jpg')";
			document.body.style.backgroundSize = "cover";
			document.getElementById("h1").style.color = "red";
		} else if (descrip == "few clouds") {
			document.body.style.backgroundImage = "url('images/few_cloud.jpg')";
		} else if (descrip == "scattered clouds" || descrip == "broken clouds") {
			document.body.style.backgroundImage = "url('images/broken_clouds.jpg')";
		} else if (descrip == "rain" || descrip == "shower rain" || descrip == "light rain") {
			document.body.style.backgroundImage = "url('images/rain.jpg')";
		} else if (descrip == "thunderstorm") {
			document.body.style.backgroundImage = "url('images/thunderston.jpg')";
		} else {
			document.body.style.background = "lightgrey";
		}
	} else {
		document.body.style.backgroundImage = "url('images/night_sky.jpg')";
		document.getElementById("h2").style.color = "blue";
	}
}
