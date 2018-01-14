'use strict';

const Test = require('tape');
const PriorityQueue = require('../js/priority_queue.js');
const DEFAULT_COMP = (a, b) => {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

Test('The PriorityQueue class constructs with no parameters', (assert) => {
	const p = new PriorityQueue();
	assert.deepEqual(p.heap.list, []);
	assert.end();
});

Test('The PriorityQueue class constructs with basic comparator', (assert) => {
	const p = new PriorityQueue((x, y) => {
		y += 10;
		if (x < y) return -1;
		else if (x === y) return 0;
		else if (x > y) return 1;
	});
	assert.deepEqual(p.heap.list, []);
	assert.end();
});

Test('The PriorityQueue class constructs with complex comparator', (assert) => {
	const p = new PriorityQueue((x, y) => {
		x = x.name.length % 2;
		y = 6 * Math.exp(y);
		if (x > y) return -1;
		else if (x === y) return 0;
		else if (x < y) return 1;
	});
	assert.deepEqual(p.heap.list, []);
	assert.end();
});

Test('The PriorityQueue class constructs with both parameters', (assert) => {
	const p = new PriorityQueue(DEFAULT_COMP, [1, 2, 3, 4, 5]);
	assert.deepEqual(p.heap.list, [1, 2, 3, 4, 5]);
	assert.end();
});

Test('The PriorityQueue class enqueues ordered elements', (assert) => {
	const p = new PriorityQueue();
	p.enqueue(1);
	assert.deepEqual(p.heap.list, [1]);
	p.enqueue(2);
	assert.deepEqual(p.heap.list, [1, 2]);
	p.enqueue(3);
	assert.deepEqual(p.heap.list, [1, 2, 3]);
	p.enqueue(4);
	assert.deepEqual(p.heap.list, [1, 2, 3, 4]);
	p.enqueue(5);
	assert.deepEqual(p.heap.list, [1, 2, 3, 4, 5]);
	assert.end();
});

Test('The PriorityQueue class enqueues unordered elements', (assert) => {
	const p = new PriorityQueue();
	p.enqueue(3);
	assert.deepEqual(p.heap.list, [3]);
	p.enqueue(5);
	assert.deepEqual(p.heap.list, [3, 5]);
	p.enqueue(4);
	assert.deepEqual(p.heap.list, [3, 5, 4]);
	p.enqueue(2);
	assert.deepEqual(p.heap.list, [2, 3, 4, 5]);
	p.enqueue(1);
	assert.deepEqual(p.heap.list, [1, 2, 4, 5, 3]);
	assert.end();
});

Test('The PriorityQueue class peeks elements', (assert) => {
	const p = new PriorityQueue();
	assert.deepEqual(p.peek(), undefined);
	p.enqueue(1);
	p.enqueue(2);
	p.enqueue(3);
	p.enqueue(4);
	p.enqueue(5);
	assert.deepEqual(p.peek(), 1);
	assert.end();
});

Test('The PriorityQueue class dequeues elements', (assert) => {
	const p = new PriorityQueue(DEFAULT_COMP, [3, 5, 4, 2, 1]);
	assert.deepEqual(p.heap.list, [1, 2, 4, 5, 3]);
	assert.deepEqual(p.dequeue(), 1);
	assert.deepEqual(p.heap.list, [2, 3, 4, 5]);
	assert.deepEqual(p.dequeue(), 2);
	assert.deepEqual(p.heap.list, [3, 5, 4]);
	assert.deepEqual(p.dequeue(), 3);
	assert.deepEqual(p.heap.list, [4, 5]);
	assert.deepEqual(p.dequeue(), 4);
	assert.deepEqual(p.heap.list, [5]);
	assert.deepEqual(p.dequeue(), 5);
	assert.deepEqual(p.heap.list, []);
	assert.deepEqual(p.dequeue(), undefined);
	assert.deepEqual(p.heap.list, []);
	assert.end();
});

Test('The PriorityQueue class deletes elements', (assert) => {
	const p = new PriorityQueue(DEFAULT_COMP, [3, 5, 4, 2, 1]);
	assert.deepEqual(p.heap.list, [1, 2, 4, 5, 3]);
	p.delete(1);
	assert.deepEqual(p.heap.list, [2, 3, 4, 5]);
	p.delete(5);
	assert.deepEqual(p.heap.list, [2, 3, 4]);
	p.delete(3);
	assert.deepEqual(p.heap.list, [2, 4]);
	p.delete(2);
	assert.deepEqual(p.heap.list, [4]);
	p.delete(3);
	assert.deepEqual(p.heap.list, [4]);
	p.delete(4);
	assert.deepEqual(p.heap.list, []);
	p.delete(3);
	assert.deepEqual(p.heap.list, []);
	assert.end();
});