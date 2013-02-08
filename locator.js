// load conf/routes & actions
// scan fs with routing paths to actions
// return data

var path = require('path'),
    Scan = require('scanfs');


module.exports.start = function start(conf, callback) {
    var scan, meta = {};

    function onfile(pathname, stat) {
        function matcher(route) {
            if (new RegExp(route.pattern).test(pathname)) {
                return conf.actions[route.action](pathname, route.param, meta);
            }
        }
        conf.routes.some(matcher);
    }

    scan = new Scan(conf.ignore || []);
    scan.on('error', callback);
    scan.on('file', onfile);
    scan.on('done', function (count) {
        console.log('• scanned %d items', count);
        return callback(null, meta);
    });

    scan.absolutely(conf.paths);
};
