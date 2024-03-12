module.exports = function (exphbs) {
    exphbs.registerHelper('hasProperty', function(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    });

    exphbs.registerHelper('getProp', function(obj, prop) {
        return obj[prop];
    });
};