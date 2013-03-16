(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.returnExports = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    Handlebars.registerHelper('if_eq', function(value, compare, options) {
        if (value == compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('unless_eq', function(value, compare, options) {
        if (value != compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('if_is', function(value, compare, options) {
        if (value === compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('unless_is', function(value, compare, options) {
        if (value !== compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('if_gt', function(value, compare, options) {
        if (value > compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('if_gte', function(value, compare, options) {
        if (value >= compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('if_lt', function(value, compare, options) {
        if (value < compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('if_lte', function(value, compare, options) {
        if (value <= compare) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('nl2br', function(text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Handlebars.SafeString(nl2br);
    })

}));