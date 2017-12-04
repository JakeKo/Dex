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

Test('The BinarySearchTree class contructs', (assert) => {
	let t = new Graph.BinarySearchTree((x) => x);
	assert.deepEqual(t._root, undefined);
	assert.deepEqual(t.root, undefined);
	assert.end();
});

Test('The BinarySearchTree class contructs with a single element given', (assert) => {
	let t = new Graph.BinarySearchTree((x) => x, [5]);
	assert.deepEqual(t.root, new Graph.Node(5));
	assert.end();
});

Test('The BinarySearchTree class contructs with multiple elements given', (assert) => {
	let t = new Graph.BinarySearchTree((x) => x, [5, 6, 7, 2, 9]);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.leftChild.value, 2);
	assert.deepEqual(t.root.rightChild.value, 6);
	assert.deepEqual(t.root.rightChild.rightChild.value, 7);
	assert.deepEqual(t.root.rightChild.rightChild.rightChild.value, 9);
	assert.end();
});

Test('The BinarySearchTree class handles undefined insertions', (assert) => {
	let t = new Graph.BinarySearchTree((x) => x);
	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.insert(undefined), false);
	assert.deepEqual(t.insert('string'), false);
	assert.deepEqual(t.insert(10), true);
	assert.deepEqual(t.insert({name: 'Joe', age: 25}), false);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.rightChild.value, 10);
	assert.end();
});

Test('The BinarySearchTree class can find nodes', (assert) => {
	let t = new Graph.BinarySearchTree((x) => x, [5, 10, 3, 8, 13, {a: 'a', b: 1231}]);
	assert.deepEqual(t.has(10), true);
	assert.deepEqual(t.has(3), true);
	assert.deepEqual(t.has(93), false);
	assert.deepEqual(t.has(undefined), false);
	assert.deepEqual(t.has({a: 'a', b: 1231}), false);
	assert.deepEqual(t.has({a: 'a', b: 1234}), false);
	assert.end();
});