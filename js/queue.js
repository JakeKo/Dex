module.exports = class Queue {
	constructor(list = new Array()) {
		this._list = list.slice()
	}

	// Returns the underlying list of elements in the queue
	get list() {
		return this._list;
	}

	// Returns the next element in the queue without removing it
	peek() {
		return this._list[0];
	}

	// Adds an element to the end of the queue
	enqueue(value) {
		this._list.push(value);
	}

	// Returns the next element in the queue
	dequeue() {
		return this._list.splice(0, 1);
	}

	// Deletes the specified value from the queue the specified number of times
	delete(value, count = 1) {
		for (let i = 0; i < count; i++) {
			let index = this._list.indexOf(value);
			if (index >= 0 && index < this._list.length) this._list.splice(index, 1);
		}
	}
}