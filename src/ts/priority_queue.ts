'use strict';

import { Heap } from './heap.js';
import { DEFAULT_COMP } from './utility.js';

export class PriorityQueue {
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