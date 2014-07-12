var arDrone = require('ar-drone'),
	droneClient = arDrone.createClient();

function takeoffDrone() {
	client.takeoff();
}

exports.takeoff = takeoffDrone;