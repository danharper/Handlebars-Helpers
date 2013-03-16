(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.returnExports = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    Handlebars.registerHelper('is', function() {
        var args = arguments
        ,   left = args[0]
        ,   operator = args[1]
        ,   right = args[2]
        ,   options = args[3]
        ;

        if (args.length == 2) {
            options = args[1];
            if (left) return options.fn(this);
            return options.inverse(this);
        }

        if (args.length == 3) {
            right = args[1];
            options = args[2];
            if (left == right) return options.fn(this);
            return options.inverse(this);
        }

        var expressions = {
            'not': function(left, right) {
                return left != right;
            },
            '>': function(left, right) {
                return left > right;
            }
        };

        if ( ! expressions.hasOwnProperty(operator)) {
            throw new Error('Unknown operator "'+operator+'"');
        }

        if (expressions[operator](left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);

    });

}));