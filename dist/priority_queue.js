'use strict';
const Heap = require('./heap.js');
var DEFAULT_COMP = (a, b) => {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else if (a > b) {
        return 1;
    }
};
module.exports = class PriorityQueue {
    constructor(comp = DEFAULT_COMP, list = []) {
        this._heap = new Heap(comp, list);
    }
    get heap() {
        return this._heap;
    }
    peek() {
        return this._heap.list[0];
    }
    enqueue(value) {
        this._heap.insert(value);
    }
    dequeue() {
        const result = this.peek();
        this.delete(result);
        return result;
    }
    delete(value) {
        this._heap.remove(value);
    }
};
