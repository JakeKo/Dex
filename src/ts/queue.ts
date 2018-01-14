'use strict';

module.exports = class Queue {
	private _list: any[];

	constructor(list: any[] = []) {
		this._list = list.slice()
	}

	// Returns the underlying list of elements in the queue
	get list() {
		return this._list;
	}

	// Returns the next element in the queue without removing it
	public peek(): any {
		return this._list[0];
	}

	// Adds an element to the end of the queue
	public enqueue(value: any): void {
		this._list.push(value);
	}

	// Returns the next element in the queue
	public dequeue(): any {
		return this._list.splice(0, 1);
	}

	// Deletes the specified value from the queue the specified number of times
	public delete(value: any, count: number = 1): void {
		for (let i: number = 0; i < count; i++) {
			const index: number = this._list.indexOf(value);
			if (index >= 0 && index < this._list.length) {
				this._list.splice(index, 1);
			}
		}
	}
}