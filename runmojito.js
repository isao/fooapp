// mv to mojito dir
// make defaults for routes, configs

var inspect = require('util').inspect,
    locator = require('./lib/locator'),
    store = require('./lib/store'),
    //store = {},

    conf = {
        paths: ['tests/fixtures/mojito-newsboxes'],
        ignore: ['.git', 'node_modules'],
        actions: require('./mojito/locator.actions'),
        routes: require('./mojito/locator.routes'),
    };


process.chdir(__dirname);

locator(conf, function (err, store) {
    if(err) {
    	console.error('• errors', err);
    }
    console.log('• config metadata', inspect(store, false, 8, true));    	
});
