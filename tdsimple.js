var inspect = require('util').inspect,

    Scan = require('scanfs'),
    Byway = require('byway'),

    conf = {
        // can use multiple paths, like: path/to/framework/resources etc
        paths: ['tests/fixtures/touchdown-simple'],
        ignore: ['.git', 'node_modules'],
        routes: [
            {'pattern':'/conf/:filename.json$', 'param': {'action': loadjson}}
        ]
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
            way.param.action(pathname, way.parts.filename, out);
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

// main //
locator(conf, function (err, out) {
    console.log('• config metadata', inspect(out, false, 8, true));
});

/*

output:

• scanned 34 items from ["tests/fixtures/touchdown-simple"]
• config metadata { app: 
   [ { settings: [ 'master' ],
       selector: 'default' },
     { settings: [ 'device:smartphone' ],
       selector: 'smartphone' } ],
  dimensions: 
   [ { dimensions: 
        [ { environment: 
             { development: { dev: null },
               integration: { int: null, int1: null },
               qa: { qa1: null },
               production: { prod: null, stage: null } } },
          { device: 
             { desktop: null,
               mobile: 
                { tablet: 
                   { 'tablet-lite': null,
                     'tablet-full': null },
                  smartphone: 
                   { 'smartphone-lite': null,
                     'smartphone-full': null },
                  featurephone: null },
               tv: null,
               console: null } },
          { lang: 
             { en: 
                { 'en-GB': null,
                  'en-US': null,
                  'en-CA': null },
               fr: { 'fr-FR': { 'fr-CA': null } } } },
          { region: 
             { US: null,
               CA: null,
               GB: null,
               FR: null } } ] } ],
  layouts: 
   [ { settings: [ 'master' ],
       default: { main: { type: 'foo' } } },
     { settings: [ 'device:smartphone' ],
       default: { main: { type: 'foo', config: { bar: 'baz' } } } } ],
  config: 
   [ { settings: [ 'master' ],
       selector: 'default' },
     { settings: [ 'device:smartphone' ],
       selector: 'smartphone' } ] }

*/