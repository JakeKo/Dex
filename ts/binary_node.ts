module.exports =  class BinaryNode {
	private _value: any;
	private _leftChild: BinaryNode;
	private _rightChild: BinaryNode;
	private _count: number;

	constructor(v: any = undefined, l: BinaryNode = undefined, r: BinaryNode = undefined) {
		this._value = v;
		this._leftChild = l;
		this._rightChild = r;
		this._count = 1;
	}
	
	// Returns the value of the node
	get value(): any {
		return this._value;
	}

	// Returns an object representing the left child of the node
	get leftChild(): BinaryNode {
		return this._leftChild;
	}

	// Returns an object representing the right child of the node
	get rightChild(): BinaryNode {
		return this._rightChild;
	}

	// Returns the count of identical values of the node
	get count(): number {
		return this._count;
	}

	// Sets the value of the node to the specified value
	set value(v: any) {
		this._value = v;
	}

	// Sets the left child of the node to the specified object
	set leftChild(l: BinaryNode) {
		this._leftChild = l;
	}

	// Sets the right child of the node to the specified object
	set rightChild(r: BinaryNode) {
		this._rightChild = r;
	}

	// Sets the count of identical values of the node
	set count(c: number) {
		this._count = c;
	}
	
	// Returns and an array containing the children of the node
	public children(): BinaryNode[] {
		return [this._leftChild, this._rightChild];
	}
}