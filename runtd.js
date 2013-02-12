var inspect = require('util').inspect,
    path = require('path'),

    Scan = require('scanfs'),
    Byway = require('byway'),
    conf = {
        paths: ['tests/fixtures/touchdown-simple'],
        ignore: ['.git', 'node_modules'],
        routes: [
            {
                'pattern':'/conf/:filename.json$',
                'param': {'action':loadjson}
            }
        ],
        actions: require('./config/start-actions')
    };


function loadjson(pathname, propname, meta) {
	return meta[propname] = require(pathname);
}

function locator(conf, callback) {
    var scan = new Scan(conf.ignore),
        byway = new Byway(conf.routes),
        out = {};

    function onfile(pathname, stat) {
        var way = byway.of(pathname);
        if(way) {
            // invoke the action with the route params + out
            conf.actions[way.param.action](pathname, way.parts.filename, out);
        }
    }

    scan.on('error', callback);
    scan.on('file', onfile);
    scan.on('done', function (count) {
        console.log('• scanned %d items from %j', count, conf.paths);
        return callback(null, out);
    });

    scan.absolutely(conf.paths);
}


locator(conf, function (err, out) {
    console.log('• config metadata', inspect(out, false, 8, true));
});
