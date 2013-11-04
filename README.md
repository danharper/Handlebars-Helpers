# Handlebars Helpers

A small collection of useful helpers for [Handlebars.js](https://github.com/wycats/handlebars.js).

[![Build Status](https://travis-ci.org/danharper/Handlebars-Helpers.png?branch=develop)](https://travis-ci.org/danharper/Handlebars-Helpers)

This version includes a (very) large API change. Use [version 1.1.0](https://github.com/danharper/Handlebars-Helpers/tree/v1.1.0) if you'd prefer the "classic" style.

To use, just include `helpers.js` after you include Handlebars. Or, if you're using AMD/Node, just require the file.

## Provided Helpers

The old `if_eq`, `if_gt`, `unless_gte` etc. helpers are now replaced with a much cleaner `is` helper.

### Comparisons

Given one argument, `is` acts exactly like `if`:

```
{{#is x}} ... {{else}} ... {{/is}}
```

Given two arguments, `is` compares the two are equal (a non-strict, `==` comparison, so `5 == '5'` is true)

```
{{#is x y}} ... {{else}} ... {{/is}}
```

Given three arguments, the second argument becomes the comparator.

```
{{#is x "not" y}} ... {{else}} ... {{/is}}
{{#is 5 ">=" 2}} ... {{else}} ... {{/is}}
```

Several comparators are built-in:

* `==` (same as not providing a comparator)
* `!=`
* `not` (alias for `!=`)
* `===`
* `!==`
* `>`
* `>=`
* `<`
* `<=`
* `in` (check a value exists in either a comma-separated string, or an array, see below)

```
// Loose equality checking
{{#is x y}} ... {{else}} ... {{/is}}
{{#is x "==" y}} ... {{else}} ... {{/is}}

{{#is x "!=" y}} ... {{else}} ... {{/is}}
{{#is x "not" y}} ... {{else}} ... {{/is}}

// Strict equality checking
{{#is x "===" y}} ... {{else}} ... {{/is}}
{{#is x "!==" y}} ... {{else}} ... {{/is}}

// Greater/Less Than
{{#is x ">" y}} ... {{else}} ... {{/is}}
{{#is x ">=" y}} ... {{else}} ... {{/is}}

{{#is x "<" y}} ... {{else}} ... {{/is}}
{{#is x "<=" y}} ... {{else}} ... {{/is}}

// In comma separated list, or array
{{#is x "in" "foo,bar"}} ... {{else}} ... {{/is}}
{{#is x "in" anArray}} ... {{else}} ... {{/is}}
```

#### Registering Custom `is` comparators
You can extend the provided comparators by registering your own, like so:

```js
// in browser
HandlebarsHelpersRegistry.add('same', function (left, right) { return left === right; });

// with AMD/Node
var HandlebarsHelpersRegistry = require('path/to/helpers');
HandlebarsHelpersRegistry.add('same', function (left, right) { return left === right; });

// usage
var template = '{{#is x "same" y}} Are the same {{else}} Not the same {{/is}}';
Handlebars.compile(template)({ x: 5, y: '5' }); // => " Not the same "
```

### Logging

Log one or multiple values to the console:

```
{{log foo bar}}
```

Log one or multiple values to the console, _with the current context_:

```
{{debug foo bar}}
```

### nl2br

Convert new lines (`\r\n`, `\n\r`, `\r`, `\n`) to line breaks

```
{{nl2br description}}
```
