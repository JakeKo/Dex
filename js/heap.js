require('./utility.js');
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
    function Heap(comp, list) {
        if (comp === void 0) { comp = DEFAULT_COMP; }
        if (list === void 0) { list = new Array(); }
        var _this = this;
        this._list = new Array();
        this._comp = function (i, j) { return !_this._list[i] || !_this._list[j] ? false : comp(_this._list[i], _this._list[j]); };
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            this.insert(item);
        }
    }
    Object.defineProperty(Heap.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    Heap.prototype._left = function (i) {
        return 2 * i + 1;
    };
    Heap.prototype._right = function (i) {
        return this._left(i) + 1;
    };
    Heap.prototype._parent = function (i) {
        return Math.floor((i - 1) / 2);
    };
    Heap.prototype._matchChild = function (i) {
        var l = this._left(i);
        var r = this._right(i);
        if (!this._list[l] && !this._list[r])
            return false;
        else if (this._list[l] && !this._list[r])
            return l;
        else if (this._list[l] && this._list[r])
            return this._comp(l, r) < 0 ? l : r;
    };
    Heap.prototype._heapifyDown = function (i) {
        var child = this._matchChild(i);
        while (this._comp(child, i) < 0) {
            this._list.swap(i, child);
            i = child;
            child = this._matchChild(i);
        }
    };
    Heap.prototype._heapifyUp = function (i) {
        var parent = this._parent(i);
        while (this._comp(i, parent) < 0) {
            this._list.swap(i, parent);
            i = parent;
            parent = this._parent(i);
        }
    };
    Heap.prototype.insert = function (value) {
        this._list.push(value);
        this._heapifyUp(this._list.length - 1);
        return true;
    };
    Heap.prototype.remove = function (value) {
        var i = this._list.indexOf(value);
        if (i < 0)
            return false;
        this._list.swap(i, this._list.length - 1);
        this._list.remove(value);
        this._heapifyUp(i);
        this._heapifyDown(i);
        return true;
    };
    return Heap;
}());
