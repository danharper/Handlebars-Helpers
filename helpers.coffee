###
 * Equal
 * eq this that
###
Handlebars.registerHelper 'eq', (value, compare, options) ->
	if value == compare then options.fn(@) else options.inverse(@)

###
 * Not Equal
 * not_eq this that
###
Handlebars.registerHelper 'not_eq', (value, compare, options) ->
	if value != compare then options.fn(@) else options.inverse(@)

###
 * Is (Strict Equal)
 * is this that
###
Handlebars.registerHelper 'is', (value, compare, options) ->
	if value is compare then options.fn(@) else options.inverse(@)

###
 * Isnt (Strict Not Equal)
 * isnt this that
###
Handlebars.registerHelper 'isnt', (value, compare, options) ->
	if value isnt compare then options.fn(@) else options.inverse(@)

###
 * Greater Than
 * gt this that
###
Handlebars.registerHelper 'gt', (value, compare, options) ->
	if value > compare then options.fn(@) else options.inverse(@)

###
 * Less Than
 * lt this that
###
Handlebars.registerHelper 'lt', (value, compare, options) ->
	if value < compare then options.fn(@) else options.inverse(@)

###
 * Greater Than or Equal To
 * gteq this that
###
Handlebars.registerHelper 'gteq', (value, compare, options) ->
	if value >= compare then options.fn(@) else options.inverse(@)

###
 * If Less Than or Equal To
 * lteq this that
###
Handlebars.registerHelper 'lteq', (value, compare, options) ->
	if value <= compare then options.fn(@) else options.inverse(@)

###
 * Length
 * length this
###
Handlebars.registerHelper 'length', (array) ->
	array.length

###
 * Log, optionally with context
 * log this
 * log this true
###
Handlebars.registerHelper 'log', (value, context = false) ->
	console.log('Context', @) if context
	console.log 'Value', value

###
 * Convert new line (\n\r) to <br>
 * from http://phpjs.org/functions/nl2br:480
 * nl2br this
###
Handlebars.registerHelper 'nl2br', (text) ->
	nl2br = (text + '').replace /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2'
	new Handlebars.SafeString nl2br
