var Test = require('tape');
var TapSpec = require('tap-spec');
Test.createStream().pipe(TapSpec()).pipe(process.stdout);
var Sets = require('../js/sets.js');

Test('The Sets class performs a union on two sets', (assert) => {
	let s1 = new Set([0, 2, 4, 6, 8]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	assert.deepEqual(Sets.union(s1, s2), new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
	assert.end();
});

Test('The Sets class performs an intersection on two sets', (assert) => {
	let s1 = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	assert.deepEqual(Sets.union(s1, s2), new Set([1, 3, 5, 7, 9]));
	
	s1 = new Set([0, 2, 4, 6, 8]);
	s2 = new Set([1, 3, 5, 7, 9]);
	assert.deepEqual(Sets.union(s1, s2), new Set([]));
	assert.end();
});

Test('The Sets class performs an exclusion on two sets', (assert) => {
	let s1 = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	assert.deepEqual(Sets.union(s1, s2), new Set([0, 2, 4, 6, 8]));
	assert.end();
});

Test('The Sets class performs a set difference on two sets', (assert) => {
	let s1 = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	assert.deepEqual(Sets.union(s1, s2), new Set([0, 2, 4, 6, 8]));
	assert.deepEqual(Sets.union(s2, s1), new Set([]));
	assert.end();
});