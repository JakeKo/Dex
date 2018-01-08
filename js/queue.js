module.exports = class Queue {
    constructor(list = new Array()) {
        this._list = list.slice();
    }
    get list() {
        return this._list;
    }
    peek() {
        return this._list[0];
    }
    enqueue(value) {
        this._list.push(value);
    }
    dequeue() {
        return this._list.splice(0, 1);
    }
    delete(value, count = 1) {
        for (let i = 0; i < count; i++) {
            let index = this._list.indexOf(value);
            if (index >= 0 && index < this._list.length)
                this._list.splice(index, 1);
        }
    }
};
