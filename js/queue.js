module.exports = (function () {
    function Queue(list) {
        if (list === void 0) { list = new Array(); }
        this._list = list.slice();
    }
    Object.defineProperty(Queue.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.peek = function () {
        return this._list[0];
    };
    Queue.prototype.enqueue = function (value) {
        this._list.push(value);
    };
    Queue.prototype.dequeue = function () {
        return this._list.splice(0, 1);
    };
    Queue.prototype.delete = function (value, count) {
        if (count === void 0) { count = 1; }
        for (var i = 0; i < count; i++) {
            var index = this._list.indexOf(value);
            if (index >= 0 && index < this._list.length)
                this._list.splice(index, 1);
        }
    };
    return Queue;
}());
