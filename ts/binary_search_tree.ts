'use strict';

const BinaryNode = require('./binary_node.js');
const DEFAULT_COMP = (a: number, b: number): number => {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

module.exports =  class BinarySearchTree {
	private _root: BinaryNode;
	private _baseComp: (a: number, b: number) => number;
	private _comp: (value: any, node: BinaryNode) => number;

	constructor(comp: (a: number, b: number) => number = DEFAULT_COMP, elements: any[] = []) {
		this.root = undefined;
		this._baseComp = comp; // Necessary for generating subtrees
		this._comp = (value: any, node: BinaryNode): number => {
			try {
				return comp(value, node.value);
			} catch {
				return undefined;
			}
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
	// Returns false if the element was not inserted
	public insert(value: any): boolean {
		let node: BinaryNode = this.root;

		if (node === undefined) {
			this.root = new BinaryNode(value);
			return true;
		}
		
		while (true) {
			const equal: number = this._comp(value, node);

			if (equal < 0) { // If the value belongs in the left subtree
				if (node.hasLeftChild()) {
					node = node.leftChild;
				} else {
					node.leftChild = new BinaryNode(value);
					return true;
				}
			} else if (equal === 0) { // If the value matches the current node
				node.count++;
				return true;
			} else if (equal > 0) { // If the value belongs in the right subtree
				if (node.hasRightChild()) {
					node = node.rightChild;
				} else {
					node.rightChild = new BinaryNode(value);
					return true;
				}
			} else {
				return false;
				// if (node === undefined) {
				// 	throw `Provided comparator cannot interpret value of undefined node`;
				// } else {
				// 	throw `Provided comparator cannot interpret provided value: ${value}`;
				// }
			}
		}
	}

	// Returns the node with the given value in the tree
	// Returns undefined if the node does not exist or the value cannot be interpreted
	public get(value: any): BinaryNode {
		let node: BinaryNode = this.root;

		while (true) {
			const equal: number = this._comp(value, node);

			if (equal < 0) { // If the value belongs in the left subtree
				node = node.leftChild;
			} else if (equal === 0) {
				return node;
			} else if (equal > 0) { // If the value belongs in the right subtree
				node = node.rightChild;
			} else {
				return undefined;
			}
		}
	}

	// Removes a value from the tree, maintaining order
	// Returns true if successful
	// Returns false if the value does not exist
	public delete(value: any): boolean {
		const node: BinaryNode = this.get(value);
		let replacer: BinaryNode = undefined;

		if (node === undefined) {
			return false;
		} else {
			node.count--;
		}

		if (node.count === 0) {
			if (node.hasLeftChild()) {
				// Replacer should be the right-most child of the left subtree
				replacer = node.leftChild;
				while (replacer.hasRightChild()) {
					replacer = replacer.rightChild;
				}
	
				// Swap values
				node.value = replacer.value;
				node.count = replacer.count;

				if (!replacer.hasLeftChild()) { // If replacer has no left subtree, remove the node
					this.parent(replacer.value).rightChild = undefined;
				} else { // If replacer has a left subtree, replacer must become that left subtree
					// Deep copy of left child
					replacer.value = replacer.leftChild.value;
					replacer.rightChild = replacer.leftChild.rightChild;
					replacer.leftChild = replacer.leftChild.leftChild;
					replacer.count = replacer.leftChild.count;
				}
			} else if (node.hasRightChild()) {
				// Replacer should be the left-most child of the right subtree
				replacer = node.rightChild;
				while (replacer.hasLeftChild()) {
					replacer = replacer.leftChild;
				}
				
				// Swap values
				node.value = replacer.value;
				node.count = replacer.count;

				if (!replacer.hasRightChild()) { // If replacer has no right subtree, remove the node
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
	// Returns undefined if the matching node has no parent, the node does not exist, or the value cannot be interpreted
	public parent(value: any): BinaryNode {
		let node: BinaryNode = this.root;
		let parent: BinaryNode = undefined;

		while (true) {
			const equal = this._comp(value, node);

			if (equal < 0) { // If the value belongs in the left subtree
				parent = node;
				node = node.leftChild;
			} else if (equal === 0) { // The node matches the given value
				return parent;
			} else if (equal > 0) { // If the value belongs in the right subtree
				parent = node;
				node = node.rightChild;
			} else {
				return undefined;
			}
		}
	}

	// Returns a binary search tree representing the left subtree of the specified node
	// Returns undefined if there is no left child or the node is undefined
	public leftSubtree(node: BinaryNode): BinarySearchTree {
		if (node === undefined || !node.hasLeftChild()) {
			return undefined;
		}

		// The left child contains all nodes in the left subtree
		const t: BinarySearchTree = new BinarySearchTree(this._baseComp);
		t.root = node.leftChild;
		return t;
	}
	
	// Returns a binary search tree representing the right subtree of the specified node
	// Returns undefined if there is no right child or the node is undefined
	public rightSubtree(node: BinaryNode): BinarySearchTree {
		if (node === undefined || !node.hasRightChild()) {
			return undefined;
		}
		
		// The right child contains all nodes in the right subtree
		const t: BinarySearchTree = new BinarySearchTree(this._baseComp);
		t.root = node.rightChild;
		return t;
	}

	// Returns an array representing a pre-order traversal
	public preOrderTraversal(): any[] {
		const result: any[] = [];
		traverse(this.root);
		return result;

		function traverse(node: BinaryNode): void {
			if (node === undefined) {
				return;
			}

			for (let i: number = 0; i < node.count; i++) { // Handle duplicate values
				result.push(node.value);
			}

			traverse(node.leftChild);
			traverse(node.rightChild);
		}
	}
	
	// Returns an array representing an in-order traversal
	public inOrderTraversal(): any[] {
		const result: any[] = [];
		traverse(this.root);
		return result;

		function traverse(node: BinaryNode): void {
			if (node === undefined) {
				return;
			}

			traverse(node.leftChild);
			
			for (let i: number = 0; i < node.count; i++) { // Handle duplicate values
				result.push(node.value);
			}

			traverse(node.rightChild);
		}
	}

	// Returns an array representing a post-order traversal
	public postOrderTraversal(): any[] {
		const result: any[] = [];
		traverse(this.root);
		return result;

		function traverse(node: BinaryNode): void {
			if (node === undefined) {
				return;
			}
			
			traverse(node.leftChild);
			traverse(node.rightChild);
			
			for (let i: number = 0; i < node.count; i++) { // Handle duplicate values
				result.push(node.value);
			}
		}
	}
}