var DEFAULT_COMP = (a, b) => {
	if (a < b) return -1;
	else if (a === b) return 0;
	else if (a > b) return 1;
	else return false;
};

module.exports = class PriorityQueue {
	constructor(comp = DEFAULT_COMP, list = new Array()) {
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