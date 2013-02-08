var inspect = require('util').inspect,
    locator = require('./locator'),
    conf = {
        paths: ['tests/fixtures/touchdown-simple'],
        ignore: [".git", "node_modules"],
        routes: require('./config/start-configs'),
        actions: require('./config/start-actions')
    };


locator.start(conf, function (err, meta) {
    console.log(inspect(meta, false, 8, true));
});
