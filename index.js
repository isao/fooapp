/*jshint laxcomma:true */

var inspect = require('util').inspect,
    config = require('./config/start')(process.argv, process.env),
    assemb = require('assemb'),
    meta = assemb.start(__dirname, config, ok);


function ok(count) {
    console.log(inspect(assemb, false, 8, true));	
}

