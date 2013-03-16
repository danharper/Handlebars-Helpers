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
		it('throws an error when an operator does not exist', function () {
			(function () { c('{{#is foo "/" bar}}Y{{/is}}', {foo:'x', bar:'y'}) })
				.should.throw('Unknown operator "/"');
		});

		describe('the not operator', function () {
			it('passes when the main arguments do not match', function(){
				c('{{#is foo "not" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('Y');
			});

			it('fails when the main arguments match', function(){
				c('{{#is foo "not" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('');
			});
		});

		describe('the > operator', function () {
			it('passes when left is greater than right', function(){
				c('{{#is foo ">" bar}}Y{{/is}}', {foo:5, bar:2}).should.equal('Y');
			});

			it('fails when left is not greater than right', function(){
				c('{{#is foo ">" bar}}Y{{/is}}', {foo:5, bar:7}).should.equal('');
				c('{{#is foo ">" bar}}Y{{/is}}', {foo:2, bar:2}).should.equal('');
			});
		});

		describe('the < operator', function () {
			it('passes when left is less than right', function(){
				c('{{#is foo "<" bar}}Y{{/is}}', {foo:2, bar:3}).should.equal('Y');
			});

			it('fails when left is not less than right', function(){
				c('{{#is foo "<" bar}}Y{{/is}}', {foo:9, bar:7}).should.equal('');
				c('{{#is foo "<" bar}}Y{{/is}}', {foo:9, bar:9}).should.equal('');
			});
		});

		describe('the >= operator', function () {
			it('passes when left is greater than or equal to right', function(){
				c('{{#is foo ">=" bar}}Y{{/is}}', {foo:5, bar:2}).should.equal('Y');
				c('{{#is foo ">=" bar}}Y{{/is}}', {foo:9, bar:9}).should.equal('Y');
			});

			it('fails when left is not greater than or equal to right', function(){
				c('{{#is foo ">=" bar}}Y{{/is}}', {foo:2, bar:7}).should.equal('');
			});
		});

		describe('the <= operator', function () {
			it('passes when left is less than or equal to right', function(){
				c('{{#is foo "<=" bar}}Y{{/is}}', {foo:2, bar:3}).should.equal('Y');
				c('{{#is foo "<=" bar}}Y{{/is}}', {foo:9, bar:9}).should.equal('Y');
			});

			it('fails when left is not less than or equal to right', function(){
				c('{{#is foo "<=" bar}}Y{{/is}}', {foo:9, bar:7}).should.equal('');
			});
		});

		describe('the ===', function () {
			it('passes when both arguments are the same', function(){
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('Y');
			});

			it('fails when both arguments are the same', function(){
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('');
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('');
			});
		});

		describe('the !==', function () {
			it('passes when both arguments are not the same', function(){
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('Y');
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('Y');
			});

			it('fails when both arguments are the same', function(){
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('');
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
