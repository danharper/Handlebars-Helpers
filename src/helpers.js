(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.HandlebarsHelpersRegistry = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    var isArray = function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    var ExpressionRegistry = function() {
        this.expressions = [];
    };

    ExpressionRegistry.prototype.add = function (operator, method) {
        this.expressions[operator] = method;
    };

    ExpressionRegistry.prototype.call = function (operator, left, right) {
        if ( ! this.expressions.hasOwnProperty(operator)) {
            throw new Error('Unknown operator "'+operator+'"');
        }

        return this.expressions[operator](left, right);
    };

    var eR = new ExpressionRegistry();
    eR.add('not', function(left, right) {
        return left != right;
    });
    eR.add('>', function(left, right) {
        return left > right;
    });
    eR.add('<', function(left, right) {
        return left < right;
    });
    eR.add('>=', function(left, right) {
        return left >= right;
    });
    eR.add('<=', function(left, right) {
        return left <= right;
    });
    eR.add('===', function(left, right) {
        return left === right;
    });
    eR.add('!==', function(left, right) {
        return left !== right;
    });
    eR.add('in', function(left, right) {
        if ( ! isArray(right)) {
            right = right.split(',');
        }
        return right.indexOf(left) !== -1;
    });
    eR.add('and', function(left, right) {
        return left && right;
    });
    eR.add('or', function(left, right) {
        return left || right;
    });

    var isHelper = function() {
        var args = arguments,
            left = args[0],
            operator = args[1],
            right = args[2],
            options = args[3];

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

        if (eR.call(operator, left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);
    };

    var areHelper = function() {
        var args = arguments,
        nbArgs = args.length - 1,
        options = args[args.length - 1],
        operators = [],
        expResult = [];

        if (nbArgs % 2 === 0 || parseInt(nbArgs % 3) + 1 !== parseInt(nbArgs / 3)) {
            throw new Error('Invalid number of arguments');
        }

        for (var i = 0; i < nbArgs; i += 3) {
            expResult.push(eR.call(args[i + 1], args[i], args[i + 2]));
            if (i + 3 < nbArgs) {
                operators.push(args[i + 3]);
                ++i;
            }
        }

        for (i = 0; i < operators.length; ++i) {
            var j = i - 1 < 0 ? 0 : i;
            expResult[j + 1] = eR.call(operators[i], expResult[j], expResult[j + 1]);
        }

        if (expResult[expResult.length - 1]) {
            return options.fn(this);
        }
        return options.inverse(this);
    };

    Handlebars.registerHelper('is', isHelper);
    Handlebars.registerHelper('are', areHelper);

    Handlebars.registerHelper('nl2br', function(text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Handlebars.SafeString(nl2br);
    });

    Handlebars.registerHelper('log', function() {
        console.log(['Values:'].concat(
            Array.prototype.slice.call(arguments, 0, -1)
        ));
    });

    Handlebars.registerHelper('debug', function() {
        console.log('Context:', this);
        console.log(['Values:'].concat(
            Array.prototype.slice.call(arguments, 0, -1)
        ));
    });

    return eR;

}));
