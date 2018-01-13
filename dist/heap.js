'use strict';
require('./utility.js');
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
module.exports = class Heap {
    constructor(comp = DEFAULT_COMP, list = []) {
        this._list = [];
        this._comp = (i, j) => {
            const first = this._list[i];
            const second = this._list[j];
            try {
                return comp(first, second);
            }
            catch (_a) {
                if (first === undefined || second === undefined) {
                    return undefined;
                }
                else {
                    throw `Provided comparator cannot interpret provided values ${first} ${second}`;
                }
            }
        };
        for (const item of list) {
            this.insert(item);
        }
    }
    get list() {
        return this._list;
    }
    _left(index) {
        return 2 * index + 1;
    }
    _right(index) {
        return this._left(index) + 1;
    }
    _parent(index) {
        return Math.floor((index - 1) / 2);
    }
    _matchChild(index) {
        const leftIndex = this._left(index);
        const rightIndex = this._right(index);
        const equal = this._comp(leftIndex, rightIndex);
        if (equal === undefined) {
            return this._list[leftIndex] === undefined ? undefined : leftIndex;
        }
        else {
            return equal < 0 ? leftIndex : rightIndex;
        }
    }
    _heapifyDown(index) {
        let childIndex = this._matchChild(index);
        while (this._comp(childIndex, index) < 0) {
            this._list.swap(index, childIndex);
            index = childIndex;
            childIndex = this._matchChild(index);
        }
    }
    _heapifyUp(index) {
        let parentIndex = this._parent(index);
        while (this._comp(index, parentIndex) < 0) {
            this._list.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = this._parent(index);
        }
    }
    insert(value) {
        this._list.push(value);
        this._heapifyUp(this._list.length - 1);
        return true;
    }
    remove(value) {
        const index = this._list.indexOf(value);
        if (index < 0) {
            return false;
        }
        this._list.swap(index, this._list.length - 1);
        this._list.remove(value);
        this._heapifyUp(index);
        this._heapifyDown(index);
        return true;
    }
};
