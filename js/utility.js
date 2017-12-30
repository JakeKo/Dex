Array.prototype.swap = function swap(first, second) {
	let temp = this[first];
	this[first] = this[second];
	this[second] = temp;
}

Array.prototype.remove = function remove(value) {
	let index = this.indexOf(value);

	if (index >= 0) {
		this.splice(index, 1);
		return true;
	} else return false;
}