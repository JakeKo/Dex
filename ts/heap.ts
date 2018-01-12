'use strict';

require('./utility.js');
const DEFAULT_COMP = (a: number, b: number): number => {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

module.exports = class Heap {
	private _list: any[];
	private _comp: (i: number, j: number) => number;

	constructor(comp: (a: number, b: number) => number = DEFAULT_COMP, list: any[] = []) {
		this._list = [];
		// Converts the provided comparator to be index-based for simplicity
		this._comp = (i: number, j: number) => {
			const first = this._list[i];
			const second = this._list[j];

			try {
				return comp(first, second);
			} catch {
				if (first === undefined || second === undefined) {
					return undefined;
				} else {
					throw `Provided comparator cannot interpret provided values ${first} ${second}`;
				}
			}
		};

		for (const item of list) {
			this.insert(item);
		}
	}

	// Returns the list of values stored in the heap
	get list(): any[] {
		return this._list;
	}

	// Returns the index of the left child
	_left(index: number): number {
		return 2 * index + 1;
	}

	// Return the index of the right child
	_right(index: number): number {
		return this._left(index) + 1;
	}

	// Returns the index of the parent
	_parent(index: number): number {
		return Math.floor((index - 1) / 2);
	}
	
	// Returns the index of the child matching the condition provided by the comparator
	// Returns undefined if the node does not have any children
	// Returns the left child if there is no right child 
	_matchChild(index: number): number {
		const leftIndex = this._left(index);
		const rightIndex = this._right(index);
		const equal = this._comp(leftIndex, rightIndex);

		if (equal === undefined) {
			return this._list[leftIndex] === undefined ? undefined : leftIndex;
		} else {
			return equal < 0 ? leftIndex : rightIndex;
		}
	}

	// Swaps a node downard until the heap is valid
	_heapifyDown(index: number): void {
		let childIndex = this._matchChild(index);
		
		while (this._comp(childIndex, index) < 0) {
			this._list.swap(index, childIndex);
			index = childIndex;
			childIndex = this._matchChild(index);
		}
	}

	// Swaps a node upward until the heap is valid
	_heapifyUp(index: number): void {
		let parentIndex = this._parent(index);
		
		while (this._comp(index, parentIndex) < 0) {
		  this._list.swap(index, parentIndex);
		  index = parentIndex;
		  parentIndex = this._parent(index);
		}
	}

	// Inserts a value into the heap, maintaining order
	// Returns true if the value is inserted successfully
	insert(value: any): boolean {
		this._list.push(value);
		this._heapifyUp(this._list.length - 1);
		return true;
	}

	// Removes a value from the heap, maintaining order
	// Returns true if the value is removed successfully
	// Returns false if the value does not exist in the heap
	remove(value: any): boolean {
		const index = this._list.indexOf(value);

		if (index < 0) {
			return false;
		}

		// Swap the value with the end of the heap and remove it
		this._list.swap(index, this._list.length - 1);
		this._list.remove(value);

		// Try heapifying in either direction
		// Only one of these should eventually modify the heap
		this._heapifyUp(index);
		this._heapifyDown(index);

		return true;
	}
}