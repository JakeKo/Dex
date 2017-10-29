class Vertex {
	constructor(name) {
		this.name = name;
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
		this.vertices = new Array();
		this.edges = new Array();
		this.adjacencyMatrix = new Array();
		this.adjacencyList = new Array();
	}

	// Returns an array of all vertices in the undirected graph
	getVertices() {
		return this.vertices;
	}

	// Returns an array of all undirected edges in the undirected graph
	getEdges() {
		return this.edges;
	}

	// Returns the adjacency matrix of the undirected graph
	getAdjacencyMatrix() {
		return this.adjacencyMatrix;
	}

	// Returns the adjacency list of the undirected graph
	getAdjacencyList() {
		return this.adjacencyList;
	}

	// Adds a new vertex a to the undirected graph
	// Returns false if the a is already in the undirected graph
	addVertex(a) {
		if (this.hasVertex(a)) return false;
		this.vertices.push(a.getName());
		// TODO Modify adjacency matrix and list		
	}

	// Removes the vertex a from the undirected graph
	// Returns false if a is not in the undirected graph
	removeVertex(a) {
		if (!this.hasVertex(a)) return false;
		this.vertices.pop(a.getName());
		// TODO Modify adjacency matrix and list
	}

	// Adds a new undirected edge e to the undirected graph
	// Returns false if vertices a or b are not in the undirected graph
	addEdge(e) { }

	// Removes the edge e from the undirected graph
	// Returns false if e is not in the undirected graph
	removeEdge(e) {	}

	// Returns an array of vertices connected to vertex a
	// Returns false if a is not in the undirected graph
	getNeighbors(a) {
		if (!this.hasVertex(a)) return false;
		return this.adjacencyList[a.getName()];
	}

	// Returns true if the undirected graph contains vertex a
	hasVertex(a) {
		return this.vertices.includes(a.getName());
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