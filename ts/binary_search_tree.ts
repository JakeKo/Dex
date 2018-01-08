'use strict';

declare function require(name: string): any;
var BinaryNode = require('./binary_node.js');

var DEFAULT_COMP = (a: number, b: number): number => {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

module.exports = class BinarySearchTree {
	_root: BinaryNode;
	_comp: (value: any, node: BinaryNode) => number;

	constructor(comp: (a: number, b: number) => number = DEFAULT_COMP, elements: any[] = []) {
		this.root = undefined;
		this._comp = (value: any, node: BinaryNode): number => {
			const equality = comp(value, node.value);
			
			if (equality === undefined) {
				throw `Provided comparator cannot interpret provided element: ${value}`;
			}

			return equality;
		}

		for (const e of elements) {
			this.insert(e);
		}
	}

	// Returns the root of the tree
	get root(): BinaryNode {
		return this._root;
	}
	
	// Sets the root to the given node
	set root(node: BinaryNode) {
		this._root = node;
	}

	// Inserts an element in the tree, maintaining order
	// Returns true if the element was successfully inserted
	// Returns false otherwise
	insert(value: any): boolean {
		let node = this.root;

		if (node === undefined) {
			this.root = new BinaryNode(value);
		} else {
			while (true) {
				const equal = this._comp(value, node);

				if (equal < 0) { // If the value belongs in the left subtree
					if (node.leftChild === undefined) {
						node.leftChild = value;
						break;
					} else {
						node = node.leftChild;
					}
				} else if (equal === 0) { // If the value matches the current node
					node.count++;
					break;
				} else if (equal > 0) { // If the value belongs in the right subtree
					if (node.rightChild === undefined) {
						node.rightChild = value;
						break;
					} else {
						node = node.rightChild;
					}
				}
			}
		}

		return true;
	}

	// Returns the node with the given value in the tree
	// Returns false if the node does not exist
	get(value: any): BinaryNode {
		let node = this.root;

		while (true) {
			const equal = this._comp(value, node);

			if (equal < 0) { // If the value belongs in the left subtree
				node = node.leftChild;
			} else if (equal === 0) {
				return node;
			} else if (equal > 0) { // If the value belongs in the right subtree
				node = node.rightChild;
			}
		}
	}

	// Removes a value from the tree, maintaining order
	// Returns true if successful
	// Returns false if the value does not exist
	delete(value: any): boolean {
		const node = this.get(value);
		let replacer = undefined;

		if (node === undefined) {
			return undefined;
		} else {
			node.count--;
		}

		if (node.count === 0) {
			if (node.leftChild !== undefined) {
				// Replacer should be the right-most child of the left subtree
				replacer = node.leftChild;
				while (replacer.rightChild !== undefined) {
					replacer = replacer.rightChild;
				}
	
				// Swap values
				node.value = replacer.value;
				node.count = replacer.count;

				if (replacer.leftChild === undefined) { // If replacer has no left subtree, remove the node
					this.parent(replacer.value).rightChild = undefined;
				} else { // If replacer has a left subtree, replacer must become that left subtree
					// Deep copy of left child
					replacer.value = replacer.leftChild.value;
					replacer.rightChild = replacer.leftChild.rightChild;
					replacer.leftChild = replacer.leftChild.leftChild;
					replacer.count = replacer.leftChild.count;
				}
			} else if (node.rightChild !== undefined) {
				// Replacer should be the left-most child of the right subtree
				replacer = node.rightChild;
				while (replacer.leftChild !== undefined) {
					replacer = replacer.leftChild;
				}
				
				// Swap values
				node.value = replacer.value;
				node.count = replacer.count;

				if (replacer.rightChild === undefined) { // If replacer has no right subtree, remove the node
					this.parent(replacer.value).leftChild = undefined;
				} else { // If replacer has a right subtree, replacer must become that right subtree
					// Deep copy of right child
					replacer.value = replacer.rightChild.value;
					replacer.leftChild = replacer.rightChild.leftChild;
					replacer.rightChild = replacer.rightChild.rightChild;
					replacer.count = replacer.rightChild.count;
				}
			} else { // If the node is a leaf
				const parent = this.parent(node.value);
				
				if (parent === undefined) { // Node is the root
					this._root = undefined;
				} else if (parent.leftChild.value === node.value) {
					parent.leftChild = undefined;
				} else if (parent.rightChild.value === node.value) {
					parent.rightChild = undefined;
				}
			}
		}

		return true;
	}

	// Returns the parent of the node with the specified value
	// Returns undefined if the value matches the root value
	// Returns false if the value does not exist
	parent(value: any): BinaryNode {
		let node = this.root;
		let parent = undefined;

		while (true) {
			const equality = this._comp(value, node);

			if (equality < 0) { // If the value belongs in the left subtree
				parent = node;
				node = node.leftChild;
			} else if (equality === 0) { // The node matches the given value
				return parent;
			} else if (equality > 0) { // If the value belongs in the right subtree
				parent = node;
				node = node.rightChild;
			}
		}
	}

	// Returns a binary search tree representing the left subtree of the specified node
	// Returns false if there is no left subtree or the node is undefined
	leftSubtree(node: BinaryNode): BinarySearchTree {
		if (node === undefined || node.leftChild === undefined) {
			return undefined;
		}

		// The left child contains all nodes in the left subtree
		const t = new BinarySearchTree(this._comp);
		t.root = node.leftChild;
		return t;
	}
	
	// Returns a binary search tree representing the right subtree of the specified node
	// Returns false if there is no right subtree or the node is undefined
	rightSubtree(node: BinaryNode): BinarySearchTree {
		if (node === undefined || node.rightChild === undefined) {
			return undefined;
		}
		
		// The right child contains all nodes in the right subtree
		const t = new BinarySearchTree(this._comp);
		t.root = node.rightChild;
		return t;
	}

	// Returns an array representing a pre-order traversal
	preOrderTraversal(): any[] {
		const result: any[] = [];
		traverse(this.root);
		return result;

		function traverse(node: BinaryNode): void {
			if (node !== undefined && (node.value !== undefined || node.leftChild !== undefined || node.rightChild !== undefined)) {
				for (let i = 0; i < node.count; i++) { // Handle duplicate values
					result.push(node.value);
				}

				traverse(node.leftChild);
				traverse(node.rightChild);
			}
		}
	}
	
	// Returns an array representing an in-order traversal
	inOrderTraversal(): any[] {
		const result: any[] = [];
		traverse(this.root);
		return result;

		function traverse(node: BinaryNode): void {
			if (node !== undefined && (node.value !== undefined || node.leftChild !== undefined || node.rightChild !== undefined)) {
				traverse(node.leftChild);
				
				for (let i = 0; i < node.count; i++) { // Handle duplicate values
					result.push(node.value);
				}

				traverse(node.rightChild);
			}
		}
	}

	// Returns an array representing a post-order traversal
	postOrderTraversal(): any[] {
		const result: any[] = [];
		traverse(this.root);
		return result;

		function traverse(node: BinaryNode): void {
			if (node !== undefined && (node.value !== undefined || node.leftChild !== undefined || node.rightChild !== undefined)) {
				traverse(node.leftChild);
				traverse(node.rightChild);
				
				for (let i = 0; i < node.count; i++) { // Handle duplicate values
					result.push(node.value);
				}
			}
		}
	}
}