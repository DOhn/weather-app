
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		var long = position.coords.longitude;
		var lat = position.coords.latitude;
		
		var loc = lat + ", " + long;
		var url = "https://api.darksky.net/forecast/51204f48e5d9e4941ddb9149fef1ee57/" + loc + "?callback=?&units=si";

		$("#data").html("Lat/Long: " + loc);
		$.getJSON(url, function(json) {
			
			var data = JSON.stringify(json);
			data = JSON.parse(data);

			var temp = data.currently.apparentTemperature;
			var hum = data.currently.humidity;
			var icon = data.currently.icon;
			var wind = data.currently.windSpeed;
			var precip = data.currently.precipProbability;

			$("#temp").html(Math.round(temp) + " °C");
			$("#humidity").html("Humidity: " + hum + "%");
			$("#wind").html("Wind: " + wind + " mph");
			$("#precip").html("Precipitation: " + precip + "%");

			var check = 0;
			$(".btn").on("click", function() {
				if (check == 0) {
					temp =  temp * 9/5 + 32;
					$("#temp").html(Math.round(temp) + " °F");
					check += 1;
				} else {
					temp = (temp - 32) / 1.8;
					$("#temp").html(Math.round(temp) + " °C");
					check -= 1;
				}
			});
			
			// Using Google Reverse Geocoder to get the detailed address
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(lat, long);
			
			geocoder.geocode({'latLng': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {					
					$('#loc').html(results[1].formatted_address);
				}
			});
			
			
			var icons = new Skycons({"color": "white"});
			switch(icon) {
				case 'clear-night':
					icons.set("icon", Skycons.CLEAR_NIGHT);
					break;
				case 'clear-day':
					icons.set("icon", Skycons.CLEAR_DAY);
					break;
				case 'partly-cloudy-day':
					icons.set("icon", Skycons.PARTLY_CLOUDY_DAY);
					break;
				case 'partly-cloudy-night':
					icons.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
					break;
				case 'cloudy':
					icons.set("icon", Skycons.CLOUDY);
					break;
				case 'rain':
					icons.set("icon", Skycons.RAIN);
					break;
				case 'sleet':
					icons.set("icon", Skycons.SLEET);
					break;
				case 'snow':
					icons.set("icon", Skycons.SNOW);
					break;
				case 'wind':
					icons.set("icon", Skycons.WIND);
					break;
				case 'fog':
					icons.set("icon", Skycons.FOG);
					break;					
				}
			icons.play();
		});	

	});
}