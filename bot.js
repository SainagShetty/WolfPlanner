require('dotenv').config();

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var mongoStorage = require('botkit-storage-mongo')({
    mongoUri: process.env.MONGO_CONNECTION,
    tables: ['student']
});

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    // debug: true 
    scopes: ['bot'],
    storage: mongoStorage
};

var controller = Botkit.slackbot(bot_options);
controller.startTicking();

var webserver = require(__dirname + '/components/express_webserver.js')(controller);
require(__dirname + '/components/user_registration.js')(controller);
require(__dirname + '/components/onboarding.js')(controller);

var normalizedPath = require("path").join(__dirname, "controllers");
require("./controllers/main.js")(controller)
