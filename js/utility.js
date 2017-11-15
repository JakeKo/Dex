Map.prototype.peekValue = function peekValue() {
	return this.values().next().value;
}

Map.prototype.peekKey = function peekKey() {
	return this.keys().next().value;
}

Map.prototype.peekEntry = function peekEntry() {
	return this.entries().next().value;
}