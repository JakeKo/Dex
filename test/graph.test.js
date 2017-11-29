var Test = require('tape');
var TapSpec = require('tap-spec');
Test.createStream().pipe(TapSpec()).pipe(process.stdout);
var Graph = require('../js/graph.js');

Test('The Node class instantitates with no arguments', (assert) => {
	let n = new Graph.Node();
	assert.deepEqual(n.value, undefined);
	assert.deepEqual(n.leftChild, undefined);
	assert.deepEqual(n.RightChild, undefined);
	assert.end();
});

Test('The Node class instantitates with only a value', (assert) => {
	let n = new Graph.Node(5);
	assert.deepEqual(n.value, 5);
	assert.deepEqual(n.leftChild, undefined);
	assert.deepEqual(n.rightChild, undefined);
	assert.end();
});

Test('The Node class instantitates with all parameters and primitive node value', (assert) => {
	let n1 = new Graph.Node();
	let n2 = new Graph.Node()
	let n = new Graph.Node(12, n1, n2);
	assert.deepEqual(n.value, 12);
	assert.deepEqual(n.leftChild, n1);
	assert.deepEqual(n.rightChild, n2);
	assert.end();
});

Test('The Node class instantitates with all parameters and complex node value', (assert) => {
	let val = { name: 'John Doe', age: 25 };
	let n1 = new Graph.Node();
	let n2 = new Graph.Node()
	let n = new Graph.Node(val, n1, n2);
	assert.deepEqual(n.value, val);
	assert.deepEqual(n.leftChild, n1);
	assert.deepEqual(n.rightChild, n2);
	assert.end();
});

Test('The Node class uses getters and setters with primitive value', (assert) => {
	let n = new Graph.Node();
	n.value = 13;
	n.leftChild = 5;
	n.rightChild = 2;
	assert.deepEqual(n.value, 13);
	assert.deepEqual(n.leftChild, new Graph.Node(5));
	assert.deepEqual(n.rightChild, new Graph.Node(2));
	assert.end();
});

Test('The Node class handles recursive values', (assert) => {
	let n1 = new Graph.Node(7, 6, 5);
	n1.leftChild = n1;
	n1.value = n1;
	assert.deepEqual(n1.leftChild.value, n1);
	assert.deepEqual(n1.value, n1);
	assert.end();
});

Test('The Node class tracks its children', (assert) => {
	let n = new Graph.Node(7, 6, 5);
	assert.deepEqual(n.children(), [6, 5]);
	assert.end();
});