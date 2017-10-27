let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

require("./models/User");
require("./models/UserAddreses");
require("./models/UserPreferences");
require("./models/Product");
require("./models/Company");
require("./models/Category");


require('dotenv');

app.use("/client", express.static('client'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.get('/*', function (req, res) {
	res.sendFile(path.resolve('client/index.html'));
});

let server = require('http').createServer(app);

server.listen(process.env.PORT_PROD || 3000, process.env.IP || "0.0.0.0", function () {
	console.log(`Server listening. ${process.env.PORT_PROD}`);
});
