'use strict';

const Test = require('tape');
const DEFAULT_COMP = require('../dist/js/utility.js').DEFAULT_COMP;
const bubbleSort = require('../dist/js/utility.js').bubbleSort;

Test('The bubble sort method sorts a numeric array', (assert) => {
	const a1 = [9, 8, 7, 6, 5, 4, 3, 2, 1];
	assert.deepEqual(bubbleSort(a1, DEFAULT_COMP), [1, 2, 3, 4, 5, 6, 7, 8, 9])
	assert.end();
});