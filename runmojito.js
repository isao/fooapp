// mv to mojito dir
// make defaults for routes, configs

var inspect = require('util').inspect,
    locator = require('./locator'),
    //store = require('./store'),
    store = {},

    conf = {
        paths: ['tests/fixtures/mojito-newsboxes'],
        ignore: ['.git', 'node_modules'],
        actions: require('./mojito/actions'),
        routes: require('./mojito/routes'),
    };


process.chdir(__dirname);

locator(conf, function (err, store) {
    console.log('• config metadata', inspect(store, false, 8, true));
});
