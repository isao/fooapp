var inspect = require('util').inspect,
    path = require('path'),

    Scan = require('scanfs'),
    conf = {
        paths: ['tests/fixtures/touchdown-simple'],
        ignore: ['.git', 'node_modules'],
        routes: require('./config/start-configs'),
        actions: require('./config/start-actions')
    };


function locator(conf, callback) {
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
        console.log('• scanned %d items from %j', count, conf.paths);
        return callback(null, meta);
    });

    scan.absolutely(conf.paths);
};


locator(conf, function (err, meta) {
    console.log('• config metadata', inspect(meta, false, 8, true));
});
