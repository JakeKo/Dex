'use strict';

Array.prototype.swap = function swap(i: number, j: number): void {
	const temp: any = this[i];
	this[i] = this[j];
	this[j] = temp;
}

Array.prototype.remove = function remove(value: any): boolean {
	const index: number = this.indexOf(value);

	if (index >= 0) {
		this.splice(index, 1);
		return true;
	} else {
		return false;
	}
}