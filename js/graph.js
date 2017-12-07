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
	isCyclic() { }

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
	constructor(v = undefined, l = undefined, r = undefined) {
		this._value = v;
		this._leftChild = l;
		this._rightChild = r;
	}
	
	// Returns the value of the node
	get value() {
		return this._value;
	}

	// Returns an object representing the left child of the node
	get leftChild() {
		return this._leftChild;
	}

	// Returns an object representing the right child of the node
	get rightChild() {
		return this._rightChild;
	}

	// Sets the value of the node to the specified value
	set value(v) {
		this._value = v;
	}

	// Sets the left child of the node to the specified object
	set leftChild(l) {
		this._leftChild = new Node(l);
	}

	// Sets the right child of the node to the specified object
	set rightChild(r) {
		this._rightChild = new Node(r);
	}
	
	// Returns and an array containing the children of the node
	children() {
		return [this._leftChild, this._rightChild];
	}
}

module.exports.BinarySearchTree = class BinarySearchTree {
	constructor(metric, elements = new Array()) {
		this._root = undefined;
		this._metric = metric;

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
		if (!this._root) this._root = new module.exports.Node(value);
		else {
			let node = this._root;
			
			while (true) {
				// If the value belongs in the left subtree
				if (this._metric(value) < this._metric(node.value)) {
					if (!node.leftChild) {
						node.leftChild = value;
						break;
					} else node = node.leftChild;
				// If the value belongs in the right subtree
				} else if (this._metric(value) >= this._metric(node.value)) {
					if (!node.rightChild) {
						node.rightChild = value;
						break;
					} else node = node.rightChild;
				// If the metric function is not suitable for the value
				} else return false;
			}
		}

		return true;
	}

	// Returns the node with the given value in the tree
	// Returns false if the node does not exist
	get(value) {
		let node = this._root;
		if (!node) return false;

		while (this._metric(node.value) !== this._metric(value)) {
			// If the value belongs in the left subtree
			if (this._metric(value) < this._metric(node.value)) {
				if (!node.leftChild) return false;
				else node = node.leftChild;
			// If the value belongs in the right subtree
			} else if (this._metric(value) >= this._metric(node.value)) {
				if (!node.rightChild) return false;
				else node = node.rightChild;
			// If the metric function is not suitable for the value
			} else return false;
		}

		return node;
	}

	// Removes a value from the tree, maintaining order
	// Returns true if successful
	// Returns false if the value does not exist
	delete(value) {
		let replacer = undefined;
		let node = this.get(value);
		if (!node) return false;
		
		if (node.leftChild) {
			// Replacer should be the right-most child of the left subtree
			replacer = replacer.leftChild;
			while (replacer.rightChild) replacer = replacer.rightChild;

			node.value = replacer.value;
			if (!replacer.leftChild) this.parent(replacer.value).rightChild = undefined;
			else {
				replacer.value = replacer.leftChild.value;
				replacer.rightChild = replacer.leftChild.rightChild;
				replacer.leftChild = replacer.leftChild.leftChild;
			}
		} else if (node.rightChild) {
			// Replacer should be the left-most child of the right subtree
			replacer = replacer.rightChild;
			while (replacer.leftChild) replacer = replacer.leftChild;
			
			node.value = replacer.value;
			if (!replacer.rightChild) this.parent(replacer.value).leftChild = undefined;
			else {
				replacer.value = replacer.rightChild.value;
				replacer.leftChild = replacer.rightChild.leftChild;
				replacer.rightChild = replacer.rightChild.rightChild;
			}
		} else {
			let parent = this.parent(node.value);
			if (parent.leftChild.value === node.value) parent.leftChild = undefined;
			else if (parent.rightChild.value === node.value) parent.rightChild = undefined;
		}

		return true;
	}

	// Returns the parent of the node with the specified value
	// Returns undefined if the value matches the root value
	// Returns false if the value does not exist
	parent(value) {
		let node = this._root;
		// Check if the node is undefined before trying to access value
		if (!node || node.value === value) return undefined;

		while (true) {
			// If the node is undefined
			if (!node) return false;
			// If the value matches the left child
			else if (node.leftChild && this._metric(value) === this._metric(node.leftChild.value)) return node;
			// If the value matches the right child
			else if (node.rightChild && this._metric(value) === this._metric(node.rightChild.value)) return node;
			// If the value belongs in the left subtree
			else if (this._metric(value) < this._metric(node.value)) node = node.leftChild;
			// If the value belongs in the right subtree
			else if (this._metric(value) >= this._metric(node.value)) node = node.rightChild;
			// If the metric function is not suitable for the value
			else return false;
		}
	}

	// Returns a binary search tree representing the left subtree of the specified node
	// Returns false if there is no left subtree or the node is undefined
	leftSubtree(node) {
		if (!node || !node.leftChild) return false;
		let t = new module.exports.BinarySearchTree(this._metric);
		
		// The left child of the given node contains all of the other nodes in the left subtree
		t.root = node.leftChild;
		return t;
	}
	
	// Returns a binary search tree representing the right subtree of the specified node
	// Returns false if there is no right subtree or the node is undefined
	rightSubtree(node) {
		if (!node || !node.rightChild) return false;
		let t = new module.exports.BinarySearchTree(this._metric);

		// The right child of the given node contains all of the other nodes in the right subtree
		t.root = node.rightChild;
		return t;
	}

	// Returns an array representing a pre-order traversal
	preOrderTraversal() {
		let result = new Array();

		function traverse(node) {
			if (node && (node.value || node.leftChild || node.rightChild)) {
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
				result.push(node.value);
			}
		}

		traverse(this.root);
		return result;
	}
}