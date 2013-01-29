var inspect = require('util').inspect,
    config = require('./config/start')(process.argv, process.env),
    assemb = require('assemb'),
    meta = assemb.start(config, ok);


function ok(out) {
    console.log(inspect(out, false, 8, true));
}
