var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"./client")));
app.use(express.static(path.join(__dirname,'./bower_components')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(8000, function(){
	console.log('Listening on port 8000');
})