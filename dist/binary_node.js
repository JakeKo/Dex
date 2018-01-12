module.exports = class BinaryNode {
    constructor(value = undefined, left = undefined, right = undefined) {
        this.value = value;
        this.leftChild = left;
        this.rightChild = right;
        this.count = 1;
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
    set value(value) {
        this._value = value;
    }
    set leftChild(left) {
        this._leftChild = left;
    }
    set rightChild(right) {
        this._rightChild = right;
    }
    set count(count) {
        this._count = count;
    }
    children() {
        return [this.leftChild, this.rightChild].filter((e) => e !== undefined);
    }
    hasValue() {
        return this.value !== undefined;
    }
    hasLeftChild() {
        return this.leftChild !== undefined;
    }
    hasRightChild() {
        return this.rightChild !== undefined;
    }
};
