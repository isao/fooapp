var Scan = require('scanfs'),
    Byway = require('byway');

/**
 * @param {object} conf with properties: paths[], ignore[], actions[], routes[]
 * @param {function} callback
 */
function locator(conf, callback) {
    var scan = new Scan(conf.ignore),
        byway = new Byway(conf.routes),
        store = {},
        errors = [];

    scan.on('error', console.error);

    scan.on('file', function onfile(pathname, stat) {
        var way = byway.of(pathname);
        if(way) {
            if(way.param.action in conf.actions) {
                conf.actions[way.param.action](pathname, way, store);
            } else {
                errors.push('action not found: ' + way.param.action);
            }
        }
    });

    scan.on('done', function done(count) {
        //console.log('• scanned %d items from %j', count, conf.paths);
        return callback(errors.length ? errors : null, store);
    });

    scan.relatively(conf.paths);
}

module.exports = locator;
