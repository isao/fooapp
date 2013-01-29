// this file can be static json

var path = require('path'),
    optimist = require('optimist');

module.exports = function configure(argv, env) {
    var args = optimist(argv).argv;

    return {

        path: [path.dirname(__dirname)]

        // optional app-specific routing
        // if this value is a string that is a valid pathname from the app dir
        // then use it to load the routes
        //routes: {},

        // optional app-specific files containing action function code
        //actions: [],
    };
};