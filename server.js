// set up ======================================================================
var express = require('express');
var app = express(); // create our app w/ express
var http = require('http');
var mongoose = require('mongoose'); // mongoose for mongodb
var port = process.env.PORT || 8080; // set the port
var database = require('./config/database'); // load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var stormpath = require('express-stormpath');

// configuration ===============================================================
mongoose.connect(database.url); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(stormpath.init(app, {
    apiKeyFile: './apiKey.properties',
    application: 'https://api.stormpath.com/v1/applications/5BcTyOoCBjzpR7pPRwBxXm',
    secretKey: 'some_long_random_string',

    enableUsername: true,
    requireUsername: true,
    enableForgotPassword: true,

    enableFacebook: true,
    enableGoogle: true,
    social: {
        facebook: {
            appId: '782744395108781',
            appSecret: 'fd376303aee189c1186917786976aec4 ',
        },
        google: {
            clientId: '240065500527-4qtdl07p1bj39ta51hcp6uee0gtghg4c.apps.googleusercontent.com',
            clientSecret: 'WarVbVZKS0Dwj9mN5Bzv6f1K',
        },
    },


    redirectUrl: '/'
}));


// routes ======================================================================

require('./app/routes.js')(app, stormpath);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);