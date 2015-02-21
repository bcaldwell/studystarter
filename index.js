var express = require('express');
var stormpath = require('express-stormpath');
var app = express();
var http = require('http');
//app.use(bodyParser())

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


    redirectUrl: '/',
    templateContext: {
        extraData: 'This is extra data.',
    }
}));

var server = http.createServer(app);

app.get('/', stormpath.loginRequired, function (req, res) {
    //    console.log('Your email address is:', req.user.email);

    res.send('If you can see this page, you must be logged into your account!');
});


server.listen(8888, function () {
    var serverAddr = server.address().address == '0.0.0.0' ? 'localhost' : server.address().address;
    console.log('Express started.\n\nPlease visit http://%s:%s', serverAddr, server.address().port);

});