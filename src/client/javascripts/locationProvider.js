var LOCATION_RECEIVER_URL = "http://something.analogfolk.com/somethingsomething";

var lastSuccessfulLocationUpdateTime = 0;

function updateLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pushCurrentLocation);
    } else {
        alert("Your shitty browser doesn't support geolocation. Find your friends yourself, caveman.");
    }
}

function pushCurrentLocation(position) {
    var positionData = {
        userId: "1",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };

    jQuery.post(LOCATION_RECEIVER_URL, positionData)
        .done(function(data) {
            console.log("Posted location");
            lastSuccessfulLocationUpdateTime = (new Date).getTime();
        })
        .fail(function() {
            console.log("Failed to post location");
            var currentTime = (new Date).getTime();

            if(lastSuccessfulLocationUpdateTime > 0 && currentTime - lastSuccessfulLocationUpdateTime > 10000) {
                // It's been more than 10 seconds since the last successful location update.
                // Give some indication that your location data is a bit out of date.
            }
        });
}

setInterval(function() {updateLocation();}, 5000);
