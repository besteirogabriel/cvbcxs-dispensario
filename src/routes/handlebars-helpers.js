// handlebars-helpers.js
module.exports = {
    hasProperty: function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    },
  
    getProp: function (obj, prop) {
      return obj[prop];
    },
  
    eq: function (a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this);
    },
  
    or: function (a, b, options) {
      return a || b ? options.fn(this) : options.inverse(this);
    }
  };
  