'use strict';

const Test = require('tape');
const Heap = require('../dist/js/heap.js').Heap;
const DEFAULT_COMP = (a, b) => {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

Test('The Heap class constructs with no parameters', (assert) => {
	const h = new Heap();
	assert.deepEqual(h.list, []);
	assert.end();
});

Test('The Heap class constructs with comp parameter', (assert) => {
	const h = new Heap(DEFAULT_COMP);
	assert.deepEqual(h.list, []);
	assert.end();
});

Test('The Heap class constructs with disordered elements', (assert) => {
	const h = new Heap(DEFAULT_COMP, [87, 23, 19, 5, 6, 7]);
	assert.deepEqual(h.list, [5, 6, 7, 87, 19, 23]);
	assert.end();
});

Test('The Heap class constructs with both parameters as a min heap', (assert) => {
	const h = new Heap(DEFAULT_COMP, [1, 2, 3, 4, 5, 6, 7]);
	assert.deepEqual(h.list, [1, 2, 3, 4, 5, 6, 7]);
	assert.end();
});

Test('The Heap class constructs with both parameters as a max heap', (assert) => {
	const h = new Heap((x, y) => {
		if (x > y) return -1;
		else if (x === y) return 0;
		else if (x > y) return 1;
	}, [1, 2, 3, 4, 5, 6, 7]);
	assert.deepEqual(h.list, [7, 4, 6, 1, 3, 2, 5]);
	assert.end();
});

Test('The Heap class inserts elements with no prior elements', (assert) => {
	const h = new Heap();
	assert.deepEqual(h.insert(5), true);
	assert.deepEqual(h.list, [5]);
	assert.deepEqual(h.insert(6), true);
	assert.deepEqual(h.list, [5, 6]);
	assert.deepEqual(h.insert(7), true);
	assert.deepEqual(h.list, [5, 6, 7]);
	assert.end();
});

Test('The Heap class inserts elements with prior elements', (assert) => {
	const h = new Heap(DEFAULT_COMP, [1, 2, 3]);
	assert.deepEqual(h.insert(5), true);
	assert.deepEqual(h.list, [1, 2, 3, 5]);
	assert.deepEqual(h.insert(6), true);
	assert.deepEqual(h.list, [1, 2, 3, 5, 6]);
	assert.deepEqual(h.insert(7), true);
	assert.deepEqual(h.list, [1, 2, 3, 5, 6, 7]);
	assert.end();
});

Test('The Heap class inserts disordered elements', (assert) => {
	const h = new Heap();
	assert.deepEqual(h.insert(87), true);
	assert.deepEqual(h.list, [87]);
	assert.deepEqual(h.insert(23), true);
	assert.deepEqual(h.list, [23, 87]);
	assert.deepEqual(h.insert(19), true);
	assert.deepEqual(h.list, [19, 87, 23]);
	assert.deepEqual(h.insert(5), true);
	assert.deepEqual(h.list, [5, 19, 23, 87]);
	assert.deepEqual(h.insert(6), true);
	assert.deepEqual(h.list, [5, 6, 23, 87, 19]);
	assert.deepEqual(h.insert(7), true);
	assert.deepEqual(h.list, [5, 6, 7, 87, 19, 23]);
	assert.end();
});

// Test('The Heap class does not insert dissimilar elements', (assert) => {
// 	const h = new Heap();
// 	h.insert(5);
// 	h.insert(6);
// 	h.insert(7);
// 	h.insert('string');
// 	h.insert({type: 'object', id: 76});
// 	assert.deepEqual(h.list, [5, 6, 7])
// 	assert.end();
// });

Test('The Heap class removes elements', (assert) => {
	const h = new Heap(DEFAULT_COMP, [1, 2, 3, 4, 5, 6, 7]);
	assert.deepEqual(h.list, [1, 2, 3, 4, 5, 6, 7]);
	assert.deepEqual(h.remove(5), true);
	assert.deepEqual(h.list, [1, 2, 3, 4, 7, 6]);
	assert.deepEqual(h.remove(1), true);
	assert.deepEqual(h.list, [2, 4, 3, 6, 7]);
	assert.deepEqual(h.remove(1), false);
	assert.deepEqual(h.list, [2, 4, 3, 6, 7]);
	assert.end();
});