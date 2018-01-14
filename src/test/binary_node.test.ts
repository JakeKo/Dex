'use strict';

const Test = require('tape');
const BinaryNode = require('../js/binary_node.js');

Test('The Node class instantitates with no arguments', (assert) => {
	const n = new BinaryNode();
	assert.deepEqual(n.value, undefined);
	assert.deepEqual(n.leftChild, undefined);
	assert.deepEqual(n.rightChild, undefined);
	assert.deepEqual(n.hasValue(), false);
	assert.deepEqual(n.hasLeftChild(), false);
	assert.deepEqual(n.hasRightChild(), false);
	assert.end();
});

Test('The Node class instantitates with only a value', (assert) => {
	const n = new BinaryNode(5);
	assert.deepEqual(n.value, 5);
	assert.deepEqual(n.leftChild, undefined);
	assert.deepEqual(n.rightChild, undefined);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), false);
	assert.deepEqual(n.hasRightChild(), false);
	assert.end();
});

Test('The Node class instantitates with all parameters and primitive node value', (assert) => {
	const n1 = new BinaryNode();
	const n2 = new BinaryNode()
	const n = new BinaryNode(12, n1, n2);
	assert.deepEqual(n.value, 12);
	assert.deepEqual(n.leftChild, n1);
	assert.deepEqual(n.rightChild, n2);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), true);
	assert.deepEqual(n.hasRightChild(), true);
	assert.end();
});

Test('The Node class instantitates with all parameters and complex node value', (assert) => {
	const val = { name: 'John Doe', age: 25 };
	const n1 = new BinaryNode();
	const n2 = new BinaryNode()
	const n = new BinaryNode(val, n1, n2);
	assert.deepEqual(n.value, val);
	assert.deepEqual(n.leftChild, n1);
	assert.deepEqual(n.rightChild, n2);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), true);
	assert.deepEqual(n.hasRightChild(), true);
	assert.end();
});

Test('The Node class uses getters and setters with primitive value', (assert) => {
	const n = new BinaryNode();
	n.value = 13;
	n.leftChild = 5;
	n.rightChild = 2;
	assert.deepEqual(n.value, 13);
	assert.deepEqual(n.leftChild, 5);
	assert.deepEqual(n.rightChild, 2);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), true);
	assert.deepEqual(n.hasRightChild(), true);
	assert.end();
});

Test('The Node class handles recursive values', (assert) => {
	const n = new BinaryNode(7, 6);
	n.leftChild = n;
	n.value = n;
	assert.deepEqual(n.leftChild, n);
	assert.deepEqual(n.value, n);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), true);
	assert.deepEqual(n.hasRightChild(), false);
	assert.end();
});

Test('The Node class tracks left child', (assert) => {
	const n = new BinaryNode(7, 6);
	assert.deepEqual(n.children(), [6]);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), true);
	assert.deepEqual(n.hasRightChild(), false);
	assert.end();
});

Test('The Node class tracks right child', (assert) => {
	const n = new BinaryNode(7);
	n.rightChild = 5;
	assert.deepEqual(n.children(), [5]);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), false);
	assert.deepEqual(n.hasRightChild(), true);
	assert.end();
});

Test('The Node class tracks both children', (assert) => {
	const n = new BinaryNode(7, 6, 5);
	assert.deepEqual(n.children(), [6, 5]);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), true);
	assert.deepEqual(n.hasRightChild(), true);
	assert.end();
});

Test('The Node class tracks deeper descendants', (assert) => {
	const n = new BinaryNode(7, 6);
	n.rightChild = new BinaryNode(5, 4, 3);
	assert.deepEqual(n.children(), [6, new BinaryNode(5, 4, 3)]);
	assert.deepEqual(n.rightChild.leftChild, 4);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), true);
	assert.deepEqual(n.hasRightChild(), true);
	assert.end();
});

Test('The Node class tracks its count', (assert) => {
	const n = new BinaryNode(5);
	assert.deepEqual(n.count, 1);
	n.count++;
	assert.deepEqual(n.count, 2);
	n.count = 7;
	assert.deepEqual(n.count, 7);
	assert.deepEqual(n.hasValue(), true);
	assert.deepEqual(n.hasLeftChild(), false);
	assert.deepEqual(n.hasRightChild(), false);
	assert.end();
});