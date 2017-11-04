var test = require('tape');
var collection = require('../js/collection.js');

test('test', (assert) => {
	let m = new collection.Matrix();
	m.pushRow([1, 2, 3]);
	assert.equal(1, 1, 'Yee');
	assert.end();
});