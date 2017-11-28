var Test = require('tape');
var TapSpec = require('tap-spec');
Test.createStream().pipe(TapSpec()).pipe(process.stdout);
var Graph = require('../js/graph.js');

Test('The Node class instantitates with no arguments', (assert) => {
	let n = new Graph.Node();
	assert.deepEqual(n.getValue(), undefined);
	assert.deepEqual(n.getLeftChild(), undefined);
	assert.deepEqual(n.getRightChild(), undefined);
	assert.end();
});

Test('The Node class instantitates with only a value', (assert) => {
	let n = new Graph.Node(5);
	assert.deepEqual(n.getValue(), 5);
	assert.deepEqual(n.getLeftChild(), undefined);
	assert.deepEqual(n.getRightChild(), undefined);
	assert.end();
});

Test('The Node class instantitates with all parameters and primitive node value', (assert) => {
	let n1 = new Graph.Node();
	let n2 = new Graph.Node()
	let n = new Graph.Node(12, n1, n2);
	assert.deepEqual(n.getValue(), 12);
	assert.deepEqual(n.getLeftChild(), n1);
	assert.deepEqual(n.getRightChild(), n2);
	assert.end();
});

Test('The Node class instantitates with all parameters and complex node value', (assert) => {
	let val = { name: 'John Doe', age: 25 };
	let n1 = new Graph.Node();
	let n2 = new Graph.Node()
	let n = new Graph.Node(val, n1, n2);
	assert.deepEqual(n.getValue(), val);
	assert.deepEqual(n.getLeftChild(), n1);
	assert.deepEqual(n.getRightChild(), n2);
	assert.end();
});

Test('The Node class uses getters and setters with primitive value', (assert) => {
	let n = new Graph.Node();
	n.setValue(13);
	n.setLeftChild(5);
	n.setRightChild(2);
	assert.deepEqual(n.getValue(), 13);
	assert.deepEqual(n.getLeftChild(), new Graph.Node(5));
	assert.deepEqual(n.getRightChild(), new Graph.Node(2));
	assert.end();
});

Test('The Node class handles recursive values', (assert) => {
	let n1 = new Graph.Node(7, 6, 5);
	n1.setLeftChild(n1);
	n1.setValue(n1);
	assert.deepEqual(n1.getLeftChild().getValue(), n1);
	assert.deepEqual(n1.getValue(), n1);
	assert.end();
});