/**
 * If Equals
 * if_eq this compare=that
 */
Handlebars.registerHelper('if_eq', function(context, options) {
	if (context == options.hash.compare)
		return options.fn(context);
	return options.inverse(context);
});

/**
 * Unless Equals
 * unless_eq this compare=that
 */
Handlebars.registerHelper('unless_eq', function(context, options) {
	if (context == options.hash.compare)
		return options.unless(context);
	return options.fn(context);
});


/**
 * If Greater Than
 * if_gt this compare=that
 */
Handlebars.registerHelper('if_gt', function(context, options) {
	if (context > options.hash.compare)
		return options.fn(context);
	return options.inverse(context);
});

/**
 * Unless Greater Than
 * unless_gt this compare=that
 */
Handlebars.registerHelper('unless_gt', function(context, options) {
	if (context > options.hash.compare)
		return options.unless(context);
	return options.fn(context);
});


/**
 * If Less Than
 * if_lt this compare=that
 */
Handlebars.registerHelper('if_lt', function(context, options) {
	if (context < options.hash.compare)
		return options.fn(context);
	return options.inverse(context);
});

/**
 * Unless Less Than
 * unless_lt this compare=that
 */
Handlebars.registerHelper('unless_lt', function(context, options) {
	if (context < options.hash.compare)
		return options.unless(context);
	return options.fn(context);
});


/**
 * If Greater Than or Equal To
 * if_gteq this compare=that
 */
Handlebars.registerHelper('if_gteq', function(context, options) {
	if (context >= options.hash.compare)
		return options.fn(context);
	return options.inverse(context);
});

/**
 * Unless Greater Than or Equal To
 * unless_gteq this compare=that
 */
Handlebars.registerHelper('unless_gteq', function(context, options) {
	if (context >= options.hash.compare)
		return options.unless(context);
	return options.fn(context);
});


/**
 * If Less Than or Equal To
 * if_lteq this compare=that
 */
Handlebars.registerHelper('if_lteq', function(context, options) {
	if (context <= options.hash.compare)
		return options.fn(context);
	return options.inverse(context);
});

/**
 * Unless Less Than or Equal To
 * unless_lteq this compare=that
 */
Handlebars.registerHelper('unless_lteq', function(context, options) {
	if (context <= options.hash.compare)
		return options.unless(context);
	return options.fn(context);
});