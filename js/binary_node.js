module.exports = class BinaryNode {
	constructor(v = undefined, l = undefined, r = undefined) {
		this._value = v;
		this._leftChild = l;
		this._rightChild = r;
		this._count = 1;
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

	// Returns the count of identical values of the node
	get count() {
		return this._count;
	}

	// Sets the value of the node to the specified value
	set value(v) {
		this._value = v;
	}

	// Sets the left child of the node to the specified object
	set leftChild(l) {
		this._leftChild = new BinaryNode(l);
	}

	// Sets the right child of the node to the specified object
	set rightChild(r) {
		this._rightChild = new BinaryNode(r);
	}

	// Sets the count of identical values of the node
	set count(c) {
		this._count = c;
	}
	
	// Returns and an array containing the children of the node
	children() {
		return [this._leftChild, this._rightChild];
	}
}