var HelpersRegistry = require('../src/helpers');

var chai = require('chai')
,	sinon = require('sinon')
,	h = require('handlebars');

chai.should();

var c = function (template, data) {
	data = data || {};
	return h.compile(template)(data);
};

describe('#is', function () {
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

		describe('the === operator', function () {
			it('passes when both arguments are the same', function(){
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('Y');
			});

			it('fails when both arguments are the same', function(){
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('');
				c('{{#is foo "===" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('');
			});
		});

		describe('the !== operator', function () {
			it('passes when both arguments are not the same', function(){
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:'5'}).should.equal('Y');
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:'p'}).should.equal('Y');
			});

			it('fails when both arguments are the same', function(){
				c('{{#is foo "!==" bar}}Y{{/is}}', {foo:5, bar:5}).should.equal('');
			});
		});

		describe('the in operator', function () {
			describe('with an array', function () {
				it('passes when left arg is in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:['a','foo','b']})
						.should.equal('Y');
				});

				it('fails when left arg is not in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:['a','b']})
						.should.equal('');
				});
			});
			describe('with a comma separated list', function () {
				it('passes when left arg is in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:'a,b,foo,c'})
						.should.equal('Y');
				});

				it('fails when left arg is not in right', function(){
					c('{{#is foo "in" bar}}Y{{/is}}', {foo:'foo', bar:'a,b,c'})
						.should.equal('');
				});
			});
		});
	});

	describe('Registering custom operator handlers', function () {
		it('works', function () {
			HelpersRegistry.add('omg', function() { return true; });
			c('{{#is foo "omg" bar}}Y{{/is}}', {foo:5,bar:5}).should.equal('Y');
		});
	});
});

describe('#nl2br', function () {
	it('Converts new lines to <br> tags', function () {
		c('{{nl2br this}}', 'Hey\r\nThere!').should.equal('Hey<br>\r\nThere!');
	});
});

describe('Logging', function () {
	beforeEach(function() {
		this.consoleMock = sinon.mock(console);
	});

	afterEach(function() {
		this.consoleMock.verify();
	});

	describe('#log', function () {
		it('Logs to the console', function(){
			this.consoleMock
				.expects('log').once()
				.withExactArgs(['Values:','foobar', 'lorem ipsum']);

			c('{{log foo lorem}}', {foo:'foobar', lorem:'lorem ipsum'});
		});
	});

	describe('#debug', function () {
		it('Debugs to the console with current context', function(){
			this.consoleMock
				.expects('log').once()
				.withExactArgs('Context:',{foo:'foobar', lorem:'lorem ipsum'});

			this.consoleMock
				.expects('log').once()
				.withExactArgs(['Values:','foobar', 'lorem ipsum']);

			c('{{debug foo lorem}}', {foo:'foobar', lorem:'lorem ipsum'});
		});
	});
});
