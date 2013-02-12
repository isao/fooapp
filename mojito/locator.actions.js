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

function debug(pathname, way, out) {
	//console.log(pathname, way.parts, way.param);
}

function appconfig(pathname, way, out) {
    if(!out.appconfig) {
    	out.appconfig = {};
    }
    out.appconfig[way.parts.filename] = loadJson(pathname);
}

function staticasset(pathname, way, out) {
    
}

function controller(pathname, way, out) {

}

function model(pathname, way, out) {

}

function view(pathname, way, out) {

}

function binder(pathname, way, out) {

}

function other(pathname, way, out) {

}

module.exports = {
    appconfig: appconfig,
    mojitconfig: debug,
    staticasset: /* staticasset */debug,
    controller: /* controller */debug,
    model: /* model */debug,
    view: /* view */debug,
    binder: /* binder */debug,
    other: /* other */debug
};
