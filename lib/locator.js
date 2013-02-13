var Scan = require('scanfs'),
    Byway = require('byway');

/**
 * @param {object} conf with properties: paths[], ignore[], actions[], routes[]
 * @param {function} callback
 */
function locator(conf, res, callback) {
    var scan = new Scan(conf.ignore),
        byway = new Byway(conf.routes),
        errors = [];

    scan.on('error', console.error);

    scan.on('file', function onfile(pathname, stat) {
        var way = byway.of(pathname);
        if(way) {
            if(way.param.action in conf.actions) {
                conf.actions[way.param.action](pathname, way, res);
            } else {
                errors.push('missing action ' + way.param.action);
            }
        } else {
        	res.unmapped.push(pathname);
        }
    });

    scan.on('done', function done(count) {
        //console.log('• scanned %d items from %j', count, conf.paths);
        return callback(errors.length ? errors : null, res);
    });

    scan.relatively(conf.paths);
}

module.exports = locator;
