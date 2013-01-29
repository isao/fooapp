var assemb = require('assemb'),
    config = require('./config/start')(process.argv, process.env);


assemb.start(config, function (err, meta) {
    console.log(require('util').inspect(meta, false, 8, true));
});
