require('./utility.js');
var DEFAULT_COMP = (a, b) => {
    if (a < b)
        return -1;
    else if (a === b)
        return 0;
    else if (a > b)
        return 1;
    else
        return false;
};
module.exports = class Heap {
    constructor(comp = DEFAULT_COMP, list = new Array()) {
        this._list = new Array();
        this._comp = (i, j) => !this._list[i] || !this._list[j] ? false : comp(this._list[i], this._list[j]);
        for (let item of list)
            this.insert(item);
    }
    get list() {
        return this._list;
    }
    _left(i) {
        return 2 * i + 1;
    }
    _right(i) {
        return this._left(i) + 1;
    }
    _parent(i) {
        return Math.floor((i - 1) / 2);
    }
    _matchChild(i) {
        let l = this._left(i);
        let r = this._right(i);
        if (!this._list[l] && !this._list[r])
            return false;
        else if (this._list[l] && !this._list[r])
            return l;
        else if (this._list[l] && this._list[r])
            return this._comp(l, r) < 0 ? l : r;
    }
    _heapifyDown(i) {
        let child = this._matchChild(i);
        while (this._comp(child, i) < 0) {
            this._list.swap(i, child);
            i = child;
            child = this._matchChild(i);
        }
    }
    _heapifyUp(i) {
        let parent = this._parent(i);
        while (this._comp(i, parent) < 0) {
            this._list.swap(i, parent);
            i = parent;
            parent = this._parent(i);
        }
    }
    insert(value) {
        this._list.push(value);
        this._heapifyUp(this._list.length - 1);
        return true;
    }
    remove(value) {
        let i = this._list.indexOf(value);
        if (i < 0)
            return false;
        this._list.swap(i, this._list.length - 1);
        this._list.remove(value);
        this._heapifyUp(i);
        this._heapifyDown(i);
        return true;
    }
};
