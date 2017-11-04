class Matrix {
	constructor() {
		this.rows = new Array();	
	}

	pushRow(newRow) {
		if (this.rows.length > 0)
			console.assert(this.rows[0].length === newRow.length, 'New row is not of the same length as existing matrix');

		this.rows.push(newRow);
	}

	insertRow(index, newRow) {
		if (this.rows.length > 0)
			console.assert(this.rows[0].length === newRow.length, 'New row is not of the same length as existing matrix');

		this.rows.splice(index, 0, newRow);
	}

	pushColumn(newColumn) {
		console.assert(this.rows.length === newColumn.length, 'New column is not of the same length as existing matrix');

		for (let i = 0; i < this.rows.length; i++)
			this.rows[i].push(newColumn[i]);
	}

	insertColumn(index, newColumn) {
		console.assert(this.rows.length === newColumn.length, 'New column is not of the same length as existing matrix');
		
		for (let i = 0; i < this.rows.length; i++)
			this.rows[i].splice(index, 0, newColumn[i]);
	}

	popRow() {
		return this.rows.pop();
	}

	removeRow(index) {
		return this.rows.splice(index, 1);
	}

	popColumn() {
		let column = new Array();

		for (let i = 0; i < this.rows.length; i++)
			column.push(this.rows[i].pop());

		return column;
	}

	removeColumn(index) {
		let column = new Array();

		for (let i = 0; i < this.rows.length; i++)
			column.push(this.rows[i].splice(index, 1)[0]);

		return column;
	}

	isSquare() {
		return this.isEmpty() ? true : this.rows.length === this.rows[0].length;
	}

	isEmpty() {
		return this.rows.length === 0;
	}
}