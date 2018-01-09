module.exports = class BinaryNode {
    constructor(v = undefined, l = undefined, r = undefined) {
        this._value = v;
        this._leftChild = l;
        this._rightChild = r;
        this._count = 1;
    }
    get value() {
        return this._value;
    }
    get leftChild() {
        return this._leftChild;
    }
    get rightChild() {
        return this._rightChild;
    }
    get count() {
        return this._count;
    }
    set value(v) {
        this._value = v;
    }
    set leftChild(l) {
        this._leftChild = l;
    }
    set rightChild(r) {
        this._rightChild = r;
    }
    set count(c) {
        this._count = c;
    }
    children() {
        return [this._leftChild, this._rightChild];
    }
};
