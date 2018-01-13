'use strict';

const Heap = require('./heap.js')
var DEFAULT_COMP: (a: number, b: number) => number = (a: number, b: number): number => {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

module.exports = class PriorityQueue {
	private _heap: Heap;

	constructor(comp: (a: number, b: number) => number = DEFAULT_COMP, list: any[] = []) {
		this._heap = new Heap(comp, list);
	}

	get heap(): Heap {
		return this._heap;
	}

	public peek(): any {
		return this._heap.list[0];
	}

	public enqueue(value: any): void {
		this._heap.insert(value);
	}

	public dequeue(): any {
		const result: any = this.peek();
		this.delete(result);
		return result;
	}

	public delete(value: any): void {
		this._heap.remove(value);
	}
}