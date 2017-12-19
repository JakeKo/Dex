module.exports = class BinaryNode {
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
		this._leftChild = new BinaryNode(l);
	}

	// Sets the right child of the node to the specified object
	set rightChild(r) {
		this._rightChild = new BinaryNode(r);
	}
	
	// Returns and an array containing the children of the node
	children() {
		return [this._leftChild, this._rightChild];
	}
}