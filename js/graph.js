class Vertex {
	constructor(id) {
		this.id = id;
	}

	getID() {
		return this.id
	}
}

class UndirectedEdge {
	// Creates an undirected edge connecting vertices a and b
	constructor(a, b, w) {
		this.endpoints = new Array(a, b);
		this.weight = w;
	}

	// Returns the endpoints of the undirected edge
	getEndpoints() {
		return this.endpoints;
	}

	// Returns the weight of the undirected edge
	getWeight() {
		return this.weight;
	}
}

class UndirectedGraph {
	constructor() {
		this.adjacencyMatrix = new Matrix();
		this.adjacencyList = new Map();
	}

	// Returns the adjacency matrix of the undirected graph
	getAdjacencyMatrix() {
		return this.adjacencyMatrix;
	}

	// Returns the adjacency list of the undirected graph
	getAdjacencyList() {
		return this.adjacencyList;
	}

	// Adds a new vertex v to the undirected graph
	// Returns false if v is already in the undirected graph
	addVertex(v) {
		if (this.hasVertex(v)) return false;
		this.adjacencyMatrix.insertRow(v.getID());
		this.adjacencyMatrix.insertColumn(v.getID());
		this.adjacencyList.set(v.getID(), new Array());
		return true;		
	}

	// Removes the vertex v from the undirected graph
	// Returns false if v is not in the undirected graph
	removeVertex(v) {
		if (!this.hasVertex(v)) return false;
		this.adjacencyMatrix.removeRow(v.getID());
		this.adjacencyMatrix.removeColumn(v.getID());
		this.adjacencyList.delete(v.getID());
		return true;
	}

	// Adds a new undirected edge between vertices u and v to the undirected graph
	// Returns false if u or v are not in the undirected graph
	addEdge(u, w, v) {
		if (!this.hasVertex(u) || !this.hasVertex(v)) return false;
		// TODO: Modify adjacency matrix
		// this.adjacencyMatrix[u.getID()][v.getID()] = w;
		// this.adjacencyMatrix[v.getID()][u.getID()] = w;
		this.adjacencyList.get(u.getID()).push({ vertex: v, weight: w });
		this.adjacencyList.get(v.getID()).push({ vertex: u, weight: w });
		return true;
	}

	// Removes the edge between vertices u and v from the undirected graph
	// Returns false if u or v are not in the undirected graph
	removeEdge(u, v) {	}

	// Returns an array of vertices connected to vertex v
	// Returns false if v is not in the undirected graph
	getNeighbors(v) {
		if (!this.hasVertex(v)) return false;
		return this.adjacencyList.get(v.getID());
	}

	// Returns true if the undirected graph contains vertex v
	hasVertex(v) {
		return this.adjacencyList.has(v.getID());
	}

	// Returns the undirected edge connecting vertices a and b
	// Returns false if a and b are not connected
	getEdge(e) { }

	// Returns the shortest undirected path from vertices a to b
	// Returns false if a and b are not connected
	getShortestPath(a, b) { }

	// Returns true if there exists at least one path from vertices a to b
	areConnected(a, b) { }

	// Returns true if the undirected graph is isometric to graph g
	isIsometric(g) { }

	// Returns true if the undirected graph is a bigraph
	isBigraph() { }

	// Returns true if the undirected graph is symmetric
	isSymmetric() { }

	// Returns true if the undirected graph is antisymmetric
	isAntisymmetric() { }

	// Returns true if the undirected graph is asymmetric
	isAsymmetric() { }

	// Returns true if the undirected graph is connected
	isConnected() { }

	// Returns true if the undirected graph is complete
	isComplete() {
		for (let v of this.vertices)
			if (this.getNeighbors(v).length !== this.vertices.length - 1)
				return false;

		return true;
	}

	// Returns true if the undirected graph is cyclic
	isCyclic() { 'p'}

	// Returns true if the undirected graph is reflexive
	isReflexive() {
		return true;
	}

	// Returns true if the undirected graph is not reflexive
	isNotReflexive() {
		return !this.isReflexive();
	}

	// Returns true if the undirected graph is irreflexive
	isIrreflexive() {
		return false;
	}
}

module.exports.Node = class Node {
	constructor(value = undefined, leftChild = undefined, rightChild = undefined) {
		this.value = value;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
	}
	
	// Returns the value of the node
	get value() {
		return this.value;
	}

	// Returns an object representing the left child of the node
	get leftChild() {
		return this.leftChild;
	}

	// Returns an object representing the right child of the node
	get rightChild() {
		return this.rightChild;
	}

	// Sets the value of the node to the specified value
	set value(value) {
		this.value = value;
	}

	// Sets the left child of the node to the specified object
	set leftChild(leftValue) {
		this.leftChild = new Node(leftValue);
	}

	// Sets the right child of the node to the specified object
	set rightChild(rightValue) {
		this.rightChild = new Node(rightValue);
	}
	
	// Returns and an array containing the children of the node
	children() {
		return [this.leftChild, this.rightChild];
	}
}

module.exports.BinarySearchTree = class BinarySearchTree {
	constructor(metric, elements) { }

	// Inserts an element in the tree, maintaining order
	// Returns true if the element was successfully inserted
	// Returns false otherwise
	insert(value) {	}

	// Removes a value from the tree, maintaining order
	// Returns the removed value
	// Returns false if the value does not exist
	delete(value) { }

	// Returns the index of the sought-for value
	// Returns false if the value does not exist or is undefined
	search(value) { }

	// Returns the parent of the specified node
	// Returns false if the node is undefined or has no parent
	parent(node) { }

	// Returns a binary search tree representing the left subtree of the specified node
	// Returns false if there is no left subtree
	// Returns false if the node is undefined
	leftSubtree(node) { }
	
	// Returns a binary search tree representing the right subtree of the specified node
	// Returns false if there is no right subtree
	// Returns false if the node is undefined
	rightSubtree(node) { }

	// Swaps the specified nodes in the tree
	// Returns false if one or both nodes do not exist in the tree
	// Returns false if one or both nodes are undefined
	swapNodes(parent, child) { }

	// Returns an array representing a pre-order traversal
	preOrderTraversal() { }
	
	// Returns an array representing an in-order traversal
	inOrderTraversal() { }

	// Returns an array representing a post-order traversal
	postOrderTraversal() { }
}