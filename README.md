# Handlebars Helpers

A small collection of useful helpers for [Handlebars.js](https://github.com/wycats/handlebars.js).

Released under the [WTFPL](http://sam.zoy.org/wtfpl/). Do whatever with it; if you make improvements it'd be _nice_ if you contributed them back but it's by no means required. Use in any project, commercial or otherwise. No warranty is provided.

## Equals

### If x Equals y
`{{#if_eq x compare=y}} ... {{/if_eq}}`

### Unless x Equals y
`{{#unless_eq x compare=y}} ... {{/unless_eq}}`

## Greater Than

### If x > y
`{{#if_gt x compare=y}} ... {{/if_gt}}`

### Unless x > y
`{{#unless_gt x compare=y}} ... {{/unless_gt}}`

## Greater Than or Equal To

### If x >= y
`{{#if_gteq x compare=y}} ... {{/if_gteq}}`

### Unless x >= y
`{{#unless_gteq x compare=y}} ... {{/unless_gteq}}`

## Less Than

### If x < y
`{{#if_lt x compare=y}} ... {{/if_lt}}`

### Unless x < y
`{{#unless_lt x compare=y}} ... {{/unless_lt}}`

## Less Than or Equal To

### If x <= y
`{{#if_lteq x compare=y}} ... {{/if_lteq}}`

### Unless x <= y
`{{#unless_lteq x compare=y}} ... {{/unless_lteq}}`

## nl2br
Convert new lines (`\r\n`, `\n\r`, `\r`, `\n`) to line breaks

`{{nl2br description}}`