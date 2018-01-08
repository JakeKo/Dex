Array.prototype.swap = function swap(first, second) {
    var temp = this[first];
    this[first] = this[second];
    this[second] = temp;
};
Array.prototype.remove = function remove(value) {
    var index = this.indexOf(value);
    if (index >= 0) {
        this.splice(index, 1);
        return true;
    }
    else
        return false;
};
