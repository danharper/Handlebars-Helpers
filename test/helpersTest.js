require('../src/helpers');

var chai = require('chai')
,	h = require('handlebars');
chai.should();

var c = function (template, data) {
	data = data || {};
	return h.compile(template)(data);
};

describe('Equals', function() {
	var data = {
		equal: { cat: 9, dog: '9' },
		not_equal: { cat: 9, dog: '8' }
	};

	describe('#if_eq', function() {
		var template = '{{#if_eq cat dog}}Yep{{else}}Nope{{/if_eq}}';

		it('main', function() {
			c(template, data.equal).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.not_equal).should.equal('Nope');
		});
	});

	describe('#unless_eq', function() {
		var template = '{{#unless_eq cat dog}}Yep{{else}}Nope{{/unless_eq}}';

		it('main', function() {
			c(template, data.not_equal).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.equal).should.equal('Nope');
		});
	});
});

describe('Strict Equals', function () {
	var data = {
		equal: { cat: 9, dog: 9 },
		not_equal: { cat: 9, dog: '9' }
	};

	describe('#if_is', function() {
		var template = '{{#if_is cat dog}}Yep{{else}}Nope{{/if_is}}';

		it('main', function() {
			c(template, data.equal).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.not_equal).should.equal('Nope');
		});
	});

	describe('#unless_is', function() {
		var template = '{{#unless_is cat dog}}Yep{{else}}Nope{{/unless_is}}';

		it('main', function() {
			c(template, data.not_equal).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.equal).should.equal('Nope');
		});
	});
});

describe('Greater Than', function () {
	var data = {
		gt: { cat: 9, dog: 6 },
		not_gt: { cat: 9, dog: 11 },
		equal: { cat: 9, dog: 9 }
	};

	describe('#if_gt', function () {
		var template = '{{#if_gt cat dog}}Yep{{else}}Nope{{/if_gt}}';

		it('main', function () {
			c(template, data.gt).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.not_gt).should.equal('Nope');
			c(template, data.equal).should.equal('Nope');
		});
	});

	describe('#if_gte', function () {
		var template = '{{#if_gte cat dog}}Yep{{else}}Nope{{/if_gte}}';

		it('main', function () {
			c(template, data.gt).should.equal('Yep');
			c(template, data.equal).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.not_gt).should.equal('Nope');
		});
	});
});

describe('Less Than', function () {
	var data = {
		lt: { cat: 6, dog: 9 },
		not_lt: { cat: 11, dog: 9 },
		equal: { cat: 9, dog: 9 }
	};

	describe('#if_lt', function () {
		var template = '{{#if_lt cat dog}}Yep{{else}}Nope{{/if_lt}}';

		it('main', function () {
			c(template, data.lt).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.not_lt).should.equal('Nope');
			c(template, data.equal).should.equal('Nope');
		});
	});

	describe('#if_lte', function () {
		var template = '{{#if_lte cat dog}}Yep{{else}}Nope{{/if_lte}}';

		it('main', function () {
			c(template, data.lt).should.equal('Yep');
			c(template, data.equal).should.equal('Yep');
		});

		it('else', function () {
			c(template, data.not_lt).should.equal('Nope');
		});
	});
});

describe('#nl2br', function () {
	var template = '{{nl2br this}}';

	it('Converts new lines to <br> tags', function () {
		var text = 'Hey\r\nThere!';
		c(template, text).should.equal('Hey<br>\r\nThere!');
	});
});



