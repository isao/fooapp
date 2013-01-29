var Module = require('../../lib/module.js');

module.exports.empty = function () {
  return new Module();
};

module.exports.instantiableController = function () {
  var module = new Module();
  module.controllers = {
    default: function (module) {
      this.module = module;
    }
  };
  module.controllers.default.prototype.index = function () {};

  return module;
};

module.exports.populated = function () {
  var module = new Module({
    getConfig: function (ctx) {
      if ('smartphone' === ctx.device) {
        return {
          test: 'smartphone'
        };
      }
      return {
        test: 'test'
      };
    }
  });

  module.ycb = {
    read: function (ctx) {
      if ('smartphone' === ctx.device) {
        return {
          selector: 'smartphone',
          test: 'smartphone'
        };
      }
      return {
        test: 'test'
      };
    }
  };
  module.config = { test: 'test' };
  module.controllers = {
    default: {
      index: function () {}
    }
  };
  module.css = {
    index: {
      default: '/test/assets/css/index.styl',
      smartphone: '/test/assets/css/index.smartphone.styl'
    }
  };
  module.css_compiled = {
    index: {
      default: '/test/assets/css/compiled/index.css',
      smartphone: '/test/assets/css/compiled/index.smartphone.css'
    }
  };
  module.js = [
    '/test/assets/js/test.js'
  ];
  module.models = {
    index: {
      default: '/test/models/index.js',
      smartphone: '/test/models/index.smartphone.js'
    }
  };
  module.templates_compiled = {
    index: {
      default: '/test/templates/compiled/index.js',
      smartphone: '/test/templates/compiled/index.smartphone.js'
    }
  };
  module.templates = {
    index: {
      default: '/test/templates/index.js',
      smartphone: '/test/templates/index.smartphone.js'
    }
  };
  module.views = {
    index: {
      default: '/test/views/index.js',
      smartphone: '/test/views/index.smartphone.js'
    }
  };
  module.lang = {
    default: {
      example: 'example'
    },
    'fr-FR': {
      example: 'exemple'
    }
  };

  return module;
};