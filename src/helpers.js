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
    }

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

    var moment = require('moment');

    var eR = new ExpressionRegistry;
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

    var isHelper = function() {
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

        if (eR.call(operator, left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);
    };

    Handlebars.registerHelper('is', isHelper);

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

    /**
    * Hack for correct display JSON string
    * {{json context}}
    */
    Handlebars.registerHelper('json', function(context) {
         if(typeof context == 'object'){
            return JSON.stringify(context, null, 2)
         }else{
            var json_obj =  JSON.parse(context);
            return JSON.stringify(json_obj, null, 2)
         };
    }); 

    /**
    * truncate string to 20 symbols
    * {{trunc "text"}}
    */
    Handlebars.registerHelper('trunc', function(text, symbols) {
        if (text !=null && text.length >= symbols){
            return text.substring(0,symbols) + "..."
        }else{
            return  false
        };
        return text
    });

    /**
    * Return only day and month: 26 Nov
    * {{short_date text}}
    */
    Handlebars.registerHelper('short_date', function(text) {
        var m = new moment(text);
        if(m.isValid()){
            return m.format("DD MMM");
        }else{
            return false
        }
    }); 

    /**
    * Return day  month and year: 20 June 2014
    * {{long_date text}}
    */
    Handlebars.registerHelper('long_date', function(text) {
        var m = new moment(text);
        if (m.isValid()){
            return m.format("DD MMM YYYY");
        }else{
            return false
        }

    }); 

    return eR;

}));