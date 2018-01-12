Array.prototype.swap = function swap(i, j) {
    const temp = this[i];
    this[i] = this[j];
    this[j] = temp;
};
Array.prototype.remove = function remove(value) {
    const index = this.indexOf(value);
    if (index >= 0) {
        this.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
};
