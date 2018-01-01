require('./utility.js');
var DEFAULT_COMP = (a, b) => {
	if (a < b) return -1;
	else if (a === b) return 0;
	else if (a >= b) return 1;
	else return false;
};

module.exports = class Heap {
	constructor(comp = DEFAULT_COMP, list = new Array()) {
		this._list = new Array();
		// Converts the provided comparator to be index-based for simplicity
		this._comp = (i, j) => !this._list[i] || !this._list[j] ? false : comp(this._list[i], this._list[j]);

		for (let item of list)
			this.insert(item);
	}

	// Returns the list of values stored in the heap
	get list() {
		return this._list;
	}

	// Returns the index of the left child
	_left(i) {
		return 2 * i + 1;
	}

	// Return the index of the right child
	_right(i) {
		return this._left(i) + 1;
	}

	// Returns the index of the parent
	_parent(i) {
		return Math.floor((i - 1) / 2);
	}
	
	// Returns false if the node does not have any children
	// Returns the left child if there is no right child 
	// Returns the index of the child matching the condition provided by the comparator
	_matchChild(i) {
		let l = this._left(i);
		let r = this._right(i);
	
		if (!this._list[l] && !this._list[r]) return false;
		else if (this._list[l] && !this._list[r]) return l;
		else if (this._list[l] && this._list[r]) return this._comp(l, r) < 0 ? l : r;
	}

	// Swaps a node downard until the heap is valid
	_heapifyDown(i) {
		let child = this._matchChild(i);
		
		// While there is a child that matches the condition to swap
		while (this._comp(child, i) < 0) {
			this._list.swap(i, child);
			i = child;
			child = this._matchChild(i);
		}
	}

	// Swaps a node upward until the heap is valid
	_heapifyUp(i) {
		let parent = this._parent(i);
		
		// While there is a parent and the parent matches the condition to swap
		while (this._comp(i, parent) < 0) {
		  this._list.swap(i, parent);
		  i = parent;
		  parent = this._parent(i);
		}
	}

	// Inserts a value into the heap, maintaining order
	// Returns true if insertion was successful
	// Returns false otherwise
	insert(value) {
		this._list.push(value);
		this._heapifyUp(this._list.length - 1);
		return true;
	}

	// Removes a value from the heap, maintaining order
	// Returns the removed value if successful
	// Returns false otherwise
	remove(value) {
		let i = this._list.indexOf(value);

		// Return false if the value does not exist in the heap
		if (i < 0) return false;

		// Swap the value with the end of the heap and remove it
		this._list.swap(i, this._list.length - 1);
		this._list.remove(value);

		// Try heapifying in either direction
		// Only one of these should eventually modify the heap
		this._heapifyUp(i);
		this._heapifyDown(i);

		return true;
	}
}