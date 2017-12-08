Map.prototype.peekValue = function peekValue() {
	return this.values().next().value;
}

Map.prototype.peekKey = function peekKey() {
	return this.keys().next().value;
}

Map.prototype.peekEntry = function peekEntry() {
	return this.entries().next().value;
}

Array.prototype.swap = function swap(first, second) {
	let temp = this[first];
	this[first] = this[second];
	this[second] = temp;
}

Array.prototype.indexOf = function indexOf(value) {
	for (let i = 0; i < this.length; i++)
		if (this[i] === value) return i;

	return -1;
}