var Heap = require('./heap.js');
var DEFAULT_COMP = function (a, b) {
    if (a < b)
        return -1;
    else if (a === b)
        return 0;
    else if (a > b)
        return 1;
    else
        return false;
};
module.exports = (function () {
    function PriorityQueue(comp, list) {
        if (comp === void 0) { comp = DEFAULT_COMP; }
        if (list === void 0) { list = new Array(); }
        this.heap = new Heap(comp, list);
    }
    PriorityQueue.prototype.peek = function () {
        return this.heap.list[0];
    };
    PriorityQueue.prototype.enqueue = function (value) {
        this.heap.insert(value);
    };
    PriorityQueue.prototype.dequeue = function () {
        var result = this.peek();
        this.delete(result);
        return result;
    };
    PriorityQueue.prototype.delete = function (value) {
        this.heap.remove(value);
    };
    return PriorityQueue;
}());
