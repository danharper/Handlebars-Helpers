(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.returnExports = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    Handlebars.registerHelper('is', function(text, second, options) {
        if (typeof options === 'undefined') {
            options = second;
            second = undefined;
        }

        if (typeof second !== 'undefined') {
            if (text == second) {
                return options.fn(this);
            }
        }
        else if (text) {
            return options.fn(this);
        }

        return options.inverse(this);
    });

}));