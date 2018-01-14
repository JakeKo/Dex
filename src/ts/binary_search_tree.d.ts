declare module 'BinarySearchTree' {
	constructor(comp: (a: number, b: number) => number = DEFAULT_COMP, elements: any[] = []);

	// Returns the root of the tree
	export function get root(): BinaryNode;
	
	// Sets the root to the given node
	export function set root(node: BinaryNode);

	// Inserts an element in the tree, maintaining order
	// Returns true if the element was successfully inserted
	// Returns false if the element was not inserted
	export function insert(value: any): boolean;

	// Returns the node with the given value in the tree
	// Returns undefined if the node does not exist or the value cannot be interpreted
	export function get(value: any): BinaryNode;

	// Removes a value from the tree, maintaining order
	// Returns true if successful
	// Returns false if the value does not exist
	export function remove(value: any): boolean;

	// Returns the parent of the node with the specified value
	// Returns undefined if the matching node has no parent, the node does not exist, or the value cannot be interpreted
	export function parent(value: any): BinaryNode;

	// Returns a binary search tree representing the left subtree of the specified node
	// Returns undefined if there is no left child or the node is undefined
	export function leftSubtree(node: BinaryNode): BinarySearchTree;
	
	// Returns a binary search tree representing the right subtree of the specified node
	// Returns undefined if there is no right child or the node is undefined
	export function rightSubtree(node: BinaryNode): BinarySearchTree;

	// Returns an array representing a pre-order traversal
	export function preOrderTraversal(): any[];
	
	// Returns an array representing an in-order traversal
	export function inOrderTraversal(): any[];

	// Returns an array representing a post-order traversal
	export function postOrderTraversal(): any[];
}