module.exports = (function () {
    function BinaryNode(v, l, r) {
        if (v === void 0) { v = undefined; }
        if (l === void 0) { l = undefined; }
        if (r === void 0) { r = undefined; }
        this._value = v;
        this._leftChild = l;
        this._rightChild = r;
        this._count = 1;
    }
    Object.defineProperty(BinaryNode.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryNode.prototype, "leftChild", {
        get: function () {
            return this._leftChild;
        },
        set: function (l) {
            this._leftChild = new BinaryNode(l);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryNode.prototype, "rightChild", {
        get: function () {
            return this._rightChild;
        },
        set: function (r) {
            this._rightChild = new BinaryNode(r);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryNode.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (c) {
            this._count = c;
        },
        enumerable: true,
        configurable: true
    });
    BinaryNode.prototype.children = function () {
        return [this._leftChild, this._rightChild];
    };
    return BinaryNode;
}());
