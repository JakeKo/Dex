var Heap = require('./heap.js')

module.exports = class PriorityQueue {
	constructor(comp, list = new Array()) {
		this.heap = new Heap(comp, list);
	}

	peek() {
		return this.heap.list[0];
	}

	enqueue(value) {
		this.heap.insert(value);
	}

	dequeue() {
		let result = this.peek();
		this.delete(result);
		return result;
	}

	delete(value) {
		this.heap.remove(value);
	}
}