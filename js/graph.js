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