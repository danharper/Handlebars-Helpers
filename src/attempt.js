(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.returnExports = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    Handlebars.registerHelper('is', function(text, options) {
        if (text) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

}));