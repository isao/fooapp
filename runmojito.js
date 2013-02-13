
var inspect = require('util').inspect,
    locator = require('./lib/locator'),
    res = {
    	client: require('./mojito/conf.client'),
    	server: require('./mojito/conf.server'),
    	unmapped: []
    },
    conf = {
        paths: ['./newsboxes'],
        ignore: ['.git', 'node_modules'],
        actions: require('./mojito/locator.actions'),
        routes: require('./mojito/locator.routes'),
    };


process.chdir(__dirname + '/tests/fixtures');
locator(conf, res, function (err, res) {
    if(err) {
        console.error('• errors', err);
    }
    console.log('• config metadata', inspect(res, false, 3, true));
    //console.log(res);
});
