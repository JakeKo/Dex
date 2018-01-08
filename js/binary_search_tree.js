var BinaryNode = require('./binary_node.js')
var DEFAULT_COMP = (a, b) => {
	if (a < b) return -1;
	else if (a === b) return 0;
	else if (a > b) return 1;
	else return false;
};

module.exports = class BinarySearchTree {
	constructor(comp = DEFAULT_COMP, elements = new Array()) {
		this._root = undefined;
		// The comp function is only used when comparing a raw value to a node value
		this._comp = (value, node) => !node ? false : comp(value, node.value);

		for (let e of elements)
			this.insert(e);
	}

	// Returns the root of the tree
	get root() {
		return this._root;
	}
	
	// Sets the root to the given node
	set root(node) {
		this._root = node;
	}

	// Inserts an element in the tree, maintaining order
	// Returns true if the element was successfully inserted
	// Returns false otherwise
	insert(value) {
		if (!this._root) this._root = new BinaryNode(value);
		else {
			let node = this._root;
			let equal = this._comp(value, node);
			
			while (true) {
				// If the value belongs in the left subtree
				if (equal === -1) {
					if (!node.leftChild) {
						node.leftChild = value;
						break;
					} else node = node.leftChild;
				// If the value matches the current node
				} else if (equal === 0) {
					node.count++;
					break;
				// If the value belongs in the right subtree
				} else if (equal === 1) {
					if (!node.rightChild) {
						node.rightChild = value;
						break;
					} else node = node.rightChild;
				} else return false;

				equal = this._comp(value, node);
			}
		}

		return true;
	}

	// Returns the node with the given value in the tree
	// Returns false if the node does not exist
	get(value) {
		let node = this._root;
		let equal = this._comp(value, node);

		while (equal !== 0) {
			// If the value belongs in the left subtree
			if (equal === -1) {
				if (!node.leftChild) return false;
				else node = node.leftChild;
			// If the value belongs in the right subtree
			} else if (equal === 1) {
				if (!node.rightChild) return false;
				else node = node.rightChild;
			} else return false;

			equal = this._comp(value, node);
		}

		return node;
	}

	// Removes a value from the tree, maintaining order
	// Returns true if successful
	// Returns false if the value does not exist
	delete(value) {
		let node = this.get(value);

		if (!node) return false;
		else node.count--;

		if (node.count === 0) {
			if (node.leftChild) {
				// Replacer should be the right-most child of the left subtree
				let replacer = replacer.leftChild;
				while (replacer.rightChild) replacer = replacer.rightChild;
	
				// Swap values
				node.value = replacer.value;
				node.count = replacer.count;

				// If replacer has no left subtree, remove the node
				if (!replacer.leftChild) this.parent(replacer.value).rightChild = undefined;
				// If replacer has a left subtree, replacer must become that left subtree
				else {
					// Deep copy of left child
					replacer.value = replacer.leftChild.value;
					replacer.rightChild = replacer.leftChild.rightChild;
					replacer.leftChild = replacer.leftChild.leftChild;
					replacer.count = replacer.leftChild.count;
				}
			} else if (node.rightChild) {
				// Replacer should be the left-most child of the right subtree
				let replacer = replacer.rightChild;
				while (replacer.leftChild) replacer = replacer.leftChild;
				
				// Swap values
				node.value = replacer.value;
				node.count = replacer.count;

				// If replacer has no right subtree, remove the node
				if (!replacer.rightChild) this.parent(replacer.value).leftChild = undefined;
				// If replacer has a right subtree, replacer must become that right subtree
				else {
					// Deep copy of right child
					replacer.value = replacer.rightChild.value;
					replacer.leftChild = replacer.rightChild.leftChild;
					replacer.rightChild = replacer.rightChild.rightChild;
					replacer.count = replacer.rightChild.count;
				}
			// If the node is a leaf
			} else {
				let parent = this.parent(node.value);
				
				// Node is the root
				if (!parent) this._root = undefined;
				else if (parent.leftChild.value === node.value) parent.leftChild = undefined;
				else if (parent.rightChild.value === node.value) parent.rightChild = undefined;
			}
		}

		return true;
	}

	// Returns the parent of the node with the specified value
	// Returns undefined if the value matches the root value
	// Returns false if the value does not exist
	parent(value) {
		let node = this._root;
		let parent = undefined;

		while (true) {
			// If the value belongs in the left subtree
			if (this._comp(value, node) === -1) {
				parent = node;
				node = node.leftChild;
			// If the value belongs in the right subtree
			} else if (this._comp(value, node) === 1) {
				parent = node;
				node = node.rightChild;
			// The node matches the given value
			} else if (this._comp(value, node) === 0) return parent;
			else return false;
		}
	}

	// Returns a binary search tree representing the left subtree of the specified node
	// Returns false if there is no left subtree or the node is undefined
	leftSubtree(node) {
		if (!node || !node.leftChild) return false;
		let t = new BinarySearchTree(this._comp);
		// The left child contains all nodes in the left subtree
		t.root = node.leftChild;
		return t;
	}
	
	// Returns a binary search tree representing the right subtree of the specified node
	// Returns false if there is no right subtree or the node is undefined
	rightSubtree(node) {
		if (!node || !node.rightChild) return false;
		let t = new BinarySearchTree(this._comp);
		// The right child contains all nodes in the right subtree
		t.root = node.rightChild;
		return t;
	}

	// Returns an array representing a pre-order traversal
	preOrderTraversal() {
		let result = new Array();

		function traverse(node) {
			if (node && (node.value || node.leftChild || node.rightChild)) {
				// Handle duplicate values
				for (let i = 0; i < node.count; i++)
					result.push(node.value);

				traverse(node.leftChild);
				traverse(node.rightChild);
			}
		}

		traverse(this.root);
		return result;
	}
	
	// Returns an array representing an in-order traversal
	inOrderTraversal() {
		let result = new Array();

		function traverse(node) {
			if (node && (node.value || node.leftChild || node.rightChild)) {
				traverse(node.leftChild);

				// Handle duplicate values
				for (let i = 0; i < node.count; i++)
					result.push(node.value);

				traverse(node.rightChild);
			}
		}

		traverse(this.root);
		return result;
	}

	// Returns an array representing a post-order traversal
	postOrderTraversal() {
		let result = new Array();

		function traverse(node) {
			if (node && (node.value || node.leftChild || node.rightChild)) {
				traverse(node.leftChild);
				traverse(node.rightChild);
				
				// Handle duplicate values
				for (let i = 0; i < node.count; i++)
					result.push(node.value);
			}
		}

		traverse(this.root);
		return result;
	}
}