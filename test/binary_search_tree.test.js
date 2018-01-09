'use strict';

const Test = require('tape');
const BinarySearchTree = require('../dist/binary_search_tree.js');
const DEFAULT_COMP = (a, b) => {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

Test('The BinarySearchTree class contructs with no parameters', (assert) => {
	const t = new BinarySearchTree();
	
	assert.deepEqual(t.root, undefined);

	assert.end();
});

Test('The BinarySearchTree class contructs with a single element given', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [5]);
	
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 1);
	assert.deepEqual(t.root.leftChild, undefined);
	assert.deepEqual(t.root.rightChild, undefined);

	assert.end();
});

Test('The BinarySearchTree class handles insertion via constructor', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [5, 3, 9, 7, 1]);

	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.leftChild.value, 3);
	assert.deepEqual(t.root.rightChild.value, 9);
	assert.deepEqual(t.root.rightChild.leftChild.value, 7);
	assert.deepEqual(t.root.leftChild.leftChild.value, 1);

	assert.end();
});

Test('The BinarySearchTree class handles duplicate elements via constructor', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [5, 5, 5, 5, 5, 5, 5]);
	
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 7);
	assert.deepEqual(t.root.leftChild, undefined);
	assert.deepEqual(t.root.rightChild, undefined);

	assert.end();
});

Test('The BinarySearchTree class handles explicit insertion', (assert) => {
	const t = new BinarySearchTree();

	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.root.value, 5);
	
	assert.deepEqual(t.insert(3), true);
	assert.deepEqual(t.root.leftChild.value, 3);
	
	assert.deepEqual(t.insert(9), true);
	assert.deepEqual(t.root.rightChild.value, 9);
	
	assert.deepEqual(t.insert(7), true);
	assert.deepEqual(t.root.rightChild.leftChild.value, 7);
	
	assert.deepEqual(t.insert(1), true);
	assert.deepEqual(t.root.leftChild.leftChild.value, 1);

	assert.end();
});

Test('The BinarySearchTree class handles duplicate elements via explicit insertion', (assert) => {
	const t = new BinarySearchTree();

	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 1);
	
	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 2);
	
	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 3);
	
	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 4);
	
	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 5);

	assert.end();
});

Test('The BinarySearchTree class handles duplicate deletions', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [5, 5, 5, 5, 5]);
	
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 5);
	
	assert.deepEqual(t.delete(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 4);
	
	assert.deepEqual(t.delete(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 3);
	
	assert.deepEqual(t.delete(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 2);
	
	assert.deepEqual(t.delete(5), true);
	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.count, 1);
	
	assert.deepEqual(t.delete(5), true);
	assert.deepEqual(t.root, undefined);
	
	assert.deepEqual(t.delete(5), false);
	assert.deepEqual(t.root, undefined);

	assert.end();
});

Test('The BinarySearchTree class handles incompatible insertions via explicit insertion', (assert) => {
	const t = new BinarySearchTree();

	assert.deepEqual(t.insert(5), true);
	assert.deepEqual(t.insert(undefined), false);
	assert.deepEqual(t.insert('string'), false);
	assert.deepEqual(t.insert(10), true);
	assert.deepEqual(t.insert({name: 'Joe', age: 25}), false);

	assert.deepEqual(t.root.value, 5);
	assert.deepEqual(t.root.leftChild, undefined);
	assert.deepEqual(t.root.rightChild.value, 10);

	assert.end();
});

Test('The BinarySearchTree class handles incompatible deletions', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [1, 2, 3, 4, 9, 8, 7, 6, 5]);

	assert.deepEqual(t.delete(5), true);
	assert.deepEqual(t.delete(undefined), false);
	assert.deepEqual(t.delete('string'), false);
	assert.deepEqual(t.delete(10), false);
	assert.deepEqual(t.delete({name: 'Joe', age: 25}), false);
	assert.deepEqual(t.delete(3), true);

	assert.deepEqual(t.root.value, 1);
	assert.deepEqual(t.root.leftChild, undefined);
	assert.deepEqual(t.root.rightChild.value, 2);
	
	assert.end();
});

Test('The BinarySearchTree class can find nodes', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [5, 10, 3, 8, 13, {a: 'a', b: 1231}]);

	assert.deepEqual(t.get(10).value, 10);
	assert.deepEqual(t.get(3).value, 3);
	assert.deepEqual(t.get(3).value, 3);
	assert.deepEqual(t.get(93), undefined);
	assert.deepEqual(t.get(undefined), undefined);
	assert.deepEqual(t.get({a: 'a', b: 1231}), undefined);
	assert.deepEqual(t.get({a: 'a', b: 1234}), undefined);

	assert.end();
});

Test('The BinarySearchTree class can remove nodes', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [5, 10, 3, 8, 13, 12, 9, 234, 7]);

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
	const t = new BinarySearchTree(DEFAULT_COMP, [5, 'string', 3, 8, 13, {a: 'a', b: 1231}]);

	assert.deepEqual(t.parent(5), undefined);
	assert.deepEqual(t.parent(3).value, 5);
	assert.deepEqual(t.parent(8).value, 5);
	assert.deepEqual(t.parent(13).value, 8);
	assert.deepEqual(t.parent(423), undefined);
	assert.deepEqual(t.parent('string'), undefined);

	assert.end();
});

Test('The BinarySearchTree class can calculate left subtrees', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [7, 3, 5, 2, 6, 8, 9, 2, 4]);
	const r1 = t.leftSubtree(t.get(7)).root;
	const r2 = new BinarySearchTree(DEFAULT_COMP, [3, 5, 2, 6, 2, 4]).root;

	assert.deepEqual(r1, r2);
	
	assert.end();
});

Test('The BinarySearchTree class can calculate right subtrees', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [7, 3, 5, 2, 6, 8, 9, 2, 4]);
	const r1 = t.rightSubtree(t.get(7)).root;
	const r2 = new BinarySearchTree(DEFAULT_COMP, [8, 9]).root;

	assert.deepEqual(r1, r2);
	
	assert.end();
});

Test('The BinarySearchTree class can traverse nodes', (assert) => {
	const t = new BinarySearchTree(DEFAULT_COMP, [7, 3, 5, 2, 6, 8, 9, 2, 4]);

	assert.deepEqual(t.preOrderTraversal(), [7, 3, 2, 2, 5, 4, 6, 8, 9]);
	assert.deepEqual(t.inOrderTraversal(), [2, 2, 3, 4, 5, 6, 7, 8, 9]);
	assert.deepEqual(t.postOrderTraversal(), [2, 2, 4, 6, 5, 3, 9, 8, 7]);

	assert.end();
});