# Handlebars Helpers

A small collection of useful helpers for [Handlebars.js](https://github.com/wycats/handlebars.js).

Released under the [WTFPL](http://sam.zoy.org/wtfpl/). Do whatever with it; if you make improvements it'd be _nice_ if you contributed them back but it's by no means required. Use in any project, commercial or otherwise. No warranty is provided.

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