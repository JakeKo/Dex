module.exports =  class BinaryNode {
	private _value: any;
	private _leftChild: BinaryNode;
	private _rightChild: BinaryNode;
	private _count: number;

	constructor(value: any = undefined, left: any = undefined, right: any = undefined) {
		this.value = value;
		this.leftChild = left;
		this.rightChild = right;
		this.count = 1;
	}
	
	// Returns the value of the node
	get value(): any {
		return this._value;
	}

	// Returns the value of the left child of the node
	get leftChild(): any {
		return this._leftChild;
	}

	// Returns the value of the right child of the node
	get rightChild(): any {
		return this._rightChild;
	}

	// Returns the count of identical values of the node
	get count(): number {
		return this._count;
	}

	// Sets the value of the node to the specified value
	set value(value: any) {
		this._value = value;
	}

	// Sets the left child of the node to the specified value
	set leftChild(left: any) {
		this._leftChild = left;
	}

	// Sets the right child of the node to the specified value
	set rightChild(right: any) {
		this._rightChild = right;
	}

	// Sets the count of identical values of the node
	set count(count: number) {
		this._count = count;
	}
	
	// Returns and an array containing the children of the node
	// Excludes undefined children
	public children(): any[] {
		return [this.leftChild, this.rightChild].filter((e) => e !== undefined);
	}

	// Returns true if the node has a value that is not undefined
	// Returns false if the node does not have a value or the value is undefined
	public hasValue(): boolean {
		return this.value !== undefined;
	}

	// Returns true if the node has a left child
	// Returns false if the node does not have a left child
	public hasLeftChild(): boolean {
		return this.leftChild !== undefined;
	}
	
	// Returns true if the node has a right child
	// Returns false if the node does not have a right child
	public hasRightChild(): boolean {
		return this.rightChild !== undefined;
	}
}