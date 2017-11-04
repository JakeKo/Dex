var Test = require('tape');
var Collection = require('../js/collection.js');

Test('The Matrix class', (assert) => {
	let m = new Collection.Matrix();
	m.pushRow([1, 2, 3]);
	assert.equal(m.rows.length, 1);
	m.pushRow([4, 5, 6]);
	assert.equal(m.rows.length, 2);
	m.pushRow([7, 8, 9]);
	assert.equal(m.rows.length, 3);
	assert.end();
});