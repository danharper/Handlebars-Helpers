# Handlebars Helpers

A small collection of useful helpers for [Handlebars.js](https://github.com/wycats/handlebars.js).

[![Build Status](https://travis-ci.org/danharper/Handlebars-Helpers.png?branch=develop)](https://travis-ci.org/danharper/Handlebars-Helpers)

This version includes a (very) large API change. Use the version on the master branch if you'd prefer the "classic" style.

### Comparisons

if x == y
```
{{#is x y}} ... {{/is}}
```

if x != y
```
{{#is x "not" y}} ... {{/is}}
```

### Strict Comparisons

```
{{#is x "===" y}} ... {{/is}}
```

```
{{#is x "!==" y}} ... {{/is}}
```

### Greater/Less Than

```
{{#is x ">" y}} ... {{/is}}
```

```
{{#is x ">=" y}} ... {{/is}}
```

```
{{#is x "<" y}} ... {{/is}}
```

```
{{#is x "<=" y}} ... {{/is}}
```

### "in"

If `x` is in either the comma-separated list, or array:

```
{{#is x "in" "foo,bar"}} ... {{/is}}
```

```
{{#is x "in" array}} ... {{/is}}
```

### Logging

Console log multiple values:

```
{{log foo bar}}
```

Console log multiple values, including the current context:

```
{{debug foo bar}}
```

### nl2br

Convert new lines (`\r\n`, `\n\r`, `\r`, `\n`) to line breaks

```
{{nl2br description}}
```