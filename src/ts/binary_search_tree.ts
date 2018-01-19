'use strict';

import { BinaryNode } from './binary_node.js';
import { DEFAULT_COMP } from './utility.js';

export class BinarySearchTree {
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

		if (node === undefined) {
			return false;
		}

		if (--node.count > 0) {
			return true;
		}

		if (node.hasLeftChild()) {
			let swapNode: BinaryNode = this.rightMostChild(node.leftChild);

			// Swap values
			node.value = swapNode.value;
			node.count = swapNode.count;

			if (swapNode.hasLeftChild()) { // If swapNode has a left child, swapNode must become that left child
				this._deepCopyNode(swapNode, swapNode.leftChild);
			} else { // Else, remove the node
				this._deleteFromParent(swapNode);
			}
		} else if (node.hasRightChild()) {
			let swapNode: BinaryNode = this.leftMostChild(node.rightChild);
			
			// Swap values
			node.value = swapNode.value;
			node.count = swapNode.count;

			if (swapNode.hasRightChild()) { // If swapNode has a right child, swapNode must become that right child
				this._deepCopyNode(swapNode, swapNode.rightChild);
			} else { // Else, remove the node
				this._deleteFromParent(swapNode);
			}
		} else { // If the node is a leaf
			this._deleteFromParent(node);
		}

		return true;
	}

	// Returns the left-most child of the given node
	public leftMostChild(node: BinaryNode): BinaryNode {
		while (node.hasLeftChild()) {
			node = node.leftChild;
		}

		return node;
	}

	// Returns the right-most child of the given node
	public rightMostChild(node: BinaryNode): BinaryNode {
		while (node.hasRightChild()) {
			node = node.rightChild;
		}

		return node;
	}

	// Creates a deep copy from the src node to the dest node
	private _deepCopyNode(dest: BinaryNode, src: BinaryNode): void {
		dest.value = src.value;
		dest.leftChild = src.leftChild;
		dest.count = src.count;
		dest.rightChild = src.rightChild;
	}

	// Deletes the given node using its parent to handle references
	private _deleteFromParent(node: BinaryNode): void {
		const parent = this.parent(node.value);
				
		if (parent === undefined) { // Node is the root
			this.root = undefined;
		} else if (parent.leftChild.value === node.value) {
			parent.leftChild = undefined;
		} else if (parent.rightChild.value === node.value) {
			parent.rightChild = undefined;
		}
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