
function loadjson(pathname, propname, meta) {
	return meta[propname] = require(pathname);
}

function loadmodule() {
	
}

function loadpage() {
	
}

module.exports = {
	loadjson: loadjson,
	loadmodule: loadmodule,
	loadpage:loadpage
}

