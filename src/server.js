var http = require('http'),
	url = require('url'),
	route = require('./router'),
	drone = require('./drone');

function startServer() {

	function handleHttpRequest(request, response) {

		var pathname = url.parse(request.url).pathname;

		route.to(pathname);

		drone.takeoff();

		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write('Howdy, world!');
		response.end();
	}

	http.createServer(handleHttpRequest).listen(8888);

}

exports.init = startServer;