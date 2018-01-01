var Test = require('tape');
var BinarySearchTree = require('../js/binary_search_tree.js');
var DEFAULT_COMP = (a, b) => {
	if (a < b) return -1;
	else if (a === b) return 0;
	else if (a >= b) return 1;
	else return false;
};

Test('The BinarySearchTree class contructs', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP);
	assert.deepEqual(t._root, undefined);
	assert.deepEqual(t.root, undefined);
	assert.end();
});

Test('The BinarySearchTree class contructs with a single element given', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP, [5]);
	assert.deepEqual(t.root.value, 5);
	assert.end();
});

Test('The BinarySearchTree class contructs with multiple elements given', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP, [5, 6, 7, 2, 9]);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.leftChild.value, 2);
	assert.deepEqual(t.root.rightChild.value, 6);
	assert.deepEqual(t.root.rightChild.rightChild.value, 7);
	assert.deepEqual(t.root.rightChild.rightChild.rightChild.value, 9);
	assert.end();
});

Test('The BinarySearchTree class handles undefined insertions', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP);
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
	let t = new BinarySearchTree(DEFAULT_COMP, [5, 10, 3, 8, 13, {a: 'a', b: 1231}]);
	assert.deepEqual(t.get(10).value, 10);
	assert.deepEqual(t.get(3).value, 3);
	assert.deepEqual(t.get(93), false);
	assert.deepEqual(t.get(undefined), false);
	assert.deepEqual(t.get({a: 'a', b: 1231}), false);
	assert.deepEqual(t.get({a: 'a', b: 1234}), false);
	assert.end();
});

Test('The BinarySearchTree class can remove nodes', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP, [5, 10, 3, 8, 13, 12, 9, 234, 7]);
	assert.deepEqual(t.delete(3), true);
	assert.deepEqual(t.delete(9), true);
	assert.deepEqual(t.delete(93), false);
	assert.deepEqual(t.delete(undefined), false);
	assert.deepEqual(t.delete({a: 'a', b: 1231}), false);
	assert.deepEqual(t.delete({a: 'a', b: 1234}), false);
	assert.deepEqual(t.inOrderTraversal(), [5, 7, 8, 10, 12, 13, 234])
	assert.end();
});

Test('The BinarySearchTree class can find parent nodes', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP, [5, 'string', 3, 8, 13, {a: 'a', b: 1231}]);
	assert.deepEqual(t.parent(5), undefined);
	assert.deepEqual(t.parent(3).value, 5);
	assert.deepEqual(t.parent(8).value, 5);
	assert.deepEqual(t.parent(13).value, 8);
	assert.deepEqual(t.parent(423), false);
	assert.deepEqual(t.parent('string'), false);
	assert.end();
});

Test('The BinarySearchTree class can calculate right subtrees', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP, [7, 3, 5, 2, 6, 8, 9, 2, 4]);

	let r1 = t.leftSubtree(t.get(7)).root;
	let r2 = new BinarySearchTree(DEFAULT_COMP, [3, 5, 2, 6, 2, 4]).root;

	r1 = t.rightSubtree(t.get(7)).root;
	r2 = new BinarySearchTree(DEFAULT_COMP, [8, 9]).root;

	assert.deepEqual(r1.value, 8);
	assert.deepEqual(r1, r2);
	assert.deepEqual(r1.rightChild.value, 9);
	assert.deepEqual(r1.rightChild, r2.rightChild);
	assert.end();
});

Test('The BinarySearchTree class can traverse nodes', (assert) => {
	let t = new BinarySearchTree(DEFAULT_COMP, [7, 3, 5, 2, 6, 8, 9, 2, 4]);
	assert.deepEqual(t.preOrderTraversal(), [7, 3, 2, 5, 4, 6, 8, 9]);
	assert.deepEqual(t.inOrderTraversal(), [2, 3, 4, 5, 6, 7, 8, 9]);
	assert.deepEqual(t.postOrderTraversal(), [2, 4, 6, 5, 3, 9, 8, 7]);
	assert.end();
});