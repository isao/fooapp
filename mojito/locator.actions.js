var fs = require('fs'),
    path = require('path');


function loadJson(pathname) {
    var abspath = path.resolve(pathname),
        out = false;

	try {
		out = require(abspath);
	} catch(err) {
		console.error('error loading "%s"', abspath);
	}

    return out;
}

function selectify(filename, res) {
	
}

function appconfig(pathname, way, res) {
    res.server[way.parts.filename] = loadJson(pathname);
}

function staticasset(pathname, way, res) {
    res.client.assets[pathname] = {
    	filename: path.basename(way.parts.subpath),
    	mimetype: path.extname(way.parts.subpath).slice(1)// todo: map extension
    };
}

function controller(pathname, way, res) {
    
}

function model(pathname, way, res) {

}

function view(pathname, way, res) {

}

function binder(pathname, way, res) {

}

function other(pathname, way, res) {

}

function noop(pathname, way, res) {
	//console.log(pathname, way.parts, way.param);
}

module.exports = {
    appconfig: appconfig,
    mojitconfig: noop,
    staticasset: staticasset,
    controller: noop,//controller,
    model: noop,//model,
    view: noop,//view,
    binder: noop,//binder,
    other: noop
};
