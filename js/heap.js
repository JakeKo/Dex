module.exports.Heap = class Heap {
	constructor(comp = (x, y) => x < y, list = new Array()) {
		this._comp = (i, j) => comp(this._list[i], this._list[j]);
		this._list = new Array();

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
		let l = this._list[this._left(i)];
		let r = this._list[this._right(i)];
	
		if (!l && !r) return undefined;
		else if (l && !r) return this._left(i);
		else if (l && r) return this._comp(l, r) ? this._left(i) : this._right(i);
	}

	_heapifyDown(i) {
		let child = this._matchChild(i);
		
		while (child && this._comp(child, i)) {
			this._list.swap(i, child);
			i = child;
			child = this._matchChild(i);
		}
	}

	_heapifyUp(i) {
		let parent = this._parent(i);
		
		while (parent >= 0 && this._comp(i, parent)) {
		  this._list.swap(i, parent);
		  i = parent;
		  parent = this._parent(i);
		}
	}

	insert(value) {
		this._list.push(value);
		this._heapifyUp(this._list.length - 1);
	}

	remove(value) {
		let i = this._list.indexOf(value);
		let parent = this._parent(i);

		this._list.swap(i, this._list.length - 1);
		let result = this._list.pop();

		if (parent >= 0) {
			if (i < this._list.length && this._comp(i, parent)) this._heapifyUp(i);
			else this._heapifyDown(i);
		}

		return result;
	}
}