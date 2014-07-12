var restify = require('restify');
var sqlite = require('sqlite3');
var db = new sqlite.Database('../../hoverseer.db');

function respond(req, res, next) {
    res.send('Hello ' + req.params.name);
    next();
}

function handleImHere(req, res, next) {
    var userId = req.params.userId;
    var postData = req.body;

    var latitude = postData.latitude;
    var longitude = postData.longitude;
    var accuracy = postData.accuracy;

    //TODO Sanity check the data before inserting it into a database.
    db.serialize(function() {
        var sth = db.prepare("INSERT INTO locations (user_id, latitude, longitude, accuracy) VALUES (?,?,?,?)");
        sth.run(userId, latitude, longitude, accuracy);
        sth.finalize();
    });

    //TODO Check that the update worked, then return the relevant message to be displayed to the user.

    var response = {"message": "Location updated"};

    res.send(response);

    next();
}

function handleWhereIsUser(req, res, next) {
    var userId = req.params.userId;
    var soughtUser = req.params.soughtUser;

    db.serialize(function() {
        var sth = db.prepare("SELECT * FROM locations WHERE user_id=? ORDER BY id DESC LIMIT 1");
        sth.get(soughtUser, function(err, row) {
            if(err) {
                res.send('{"message": "Failed to retrieve location information"}');
                next;
            } else {
                responseData = {
                    "user":         row.user_id,
                    "latitude":     row.latitude,
                    "longitude":    row.longitude,
                    "accuracy":     row.accuracy,
                    "createdDate":  row.created_date
                };

                res.send(responseData);
                next();
            }
        });
        sth.finalize();
    });
}

var server = restify.createServer();
server.use(restify.bodyParser({mapParams: false}));
server.post('/user/:userId/location', handleImHere);
server.get('/user/:userId/find/:soughtUser', handleWhereIsUser)

server.listen(8080, function() {
    console.log('%slistening at %s', server.name, server.url);
});
