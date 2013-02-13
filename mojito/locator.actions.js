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

function addSubprop(obj, record, key, val) {
    if(!obj[record]) {
        obj[record] = {};
    }
    obj[record][key] = undefined === val ? true : val;
}

function appconfig(pathname, way, res) {
    res.server.configs[way.parts.filename] = loadJson(pathname);
}

function mojitconfig(pathname, way, res) {
    addSubprop(res.server.mojits, way.parts.mojit, way.parts.filename, loadJson(pathname));
}

function staticasset(pathname, way, res) {
    var filename = path.basename(way.parts.subpath),
        fileparts = filename.split('.');

    res.client.assets[pathname] = {
        name: filename,
        mime: path.extname(filename).slice(1)// todo: extension => mimetype
    };

    if(fileparts.length > 2) {
        addSubprop(res.client.selectors, fileparts[1], pathname);
    }
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
