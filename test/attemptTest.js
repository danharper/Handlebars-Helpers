require('../src/attempt');

var chai = require('chai')
,	h = require('handlebars');
chai.should();

var c = function (template, data) {
	data = data || {};
	return h.compile(template)(data);
};

describe('Is', function () {
	describe('with single argument', function () {
		it('passes a single truthy value', function(){
			c('{{#is foo}}Y{{/is}}', {foo:true}).should.equal('Y');
			c('{{#is foo}}Y{{/is}}', {foo:'x'}).should.equal('Y');
		});
		it('fails a single falsey value', function(){
			c('{{#is foo}}Y{{/is}}', {foo:false}).should.equal('');
			c('{{#is foo}}Y{{/is}}', {foo:''}).should.equal('');
		});
	});

	describe('with two arguments', function () {
		it('passes when both arguments match loosely', function(){
			c('{{#is foo bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('Y');
			c('{{#is foo bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('Y');
		});

		it('fails when both arguments do not match', function(){
			c('{{#is foo bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('');
		});
	});

	describe('with three arguments', function () {
		describe('with not', function () {
			it('passes when the main arguments do not match', function(){
				c('{{#is foo "not" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('Y');
			});

			it('fails when the main arguments match', function(){
				c('{{#is foo "not" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('');
			});
		});
	});

	// #is foo 				foo == true
	// #is foo bar 			foo == bar
	// #is foo == bar 		foo == bar
	// #is foo === bar 		foo === bar
	// #is foo != bar 		foo != bar
	// #is foo !== bar 		foo !== bar
	// #is foo not bar 		foo != bar

	// #is foo > bar 		foo > bar
	// #is foo >= bar
	// #is foo < bar
	// #is foo <= bar
});
