var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use("/client", express.static('client'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.get('/*', function (req, res) {
	res.sendFile(path.resolve('client/index.html'));
});

var server = require('http').createServer(app);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
	console.log('Server listening.');
});
