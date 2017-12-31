var Test = require('tape');
var TapSpec = require('tap-spec');
Test.createStream().pipe(TapSpec()).pipe(process.stdout);
var Sets = require('../js/sets.js');

// All sets are identical in the eyes of deepEqual
// This ensures element-wise identicality
var toSortedArray = (set) => {
	return Array.from(set).sort();
}

Test('The Sets class performs a union on two nonempty sets', (assert) => {
	let s1 = new Set([0, 2, 4, 6, 8]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	let union = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	assert.deepEqual(toSortedArray(Sets.union(s1, s2)), union);
	assert.end();
});

Test('The Sets class performs an intersection on two nonempty, intersecting sets', (assert) => {
	let s1 = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	let intersection = [1, 3, 5, 7, 9];

	assert.deepEqual(toSortedArray(Sets.intersection(s1, s2)), intersection);
	assert.end();
});

Test('The Sets class performs an exclusion on two nonempty, intersecting sets', (assert) => {
	let s1 = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	let exclusion = [0, 2, 4, 6, 8];

	assert.deepEqual(toSortedArray(Sets.exclusion(s1, s2)), exclusion);
	assert.end();
});

Test('The Sets class performs a set difference on two nonempty, intersecting sets', (assert) => {
	let s1 = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	let s2 = new Set([1, 3, 5, 7, 9]);
	let diff1 = [0, 2, 4, 6, 8];
	let diff2 = [];

	assert.deepEqual(toSortedArray(Sets.difference(s1, s2)), diff1);
	assert.deepEqual(toSortedArray(Sets.difference(s2, s1)), diff2);
	assert.end();
});