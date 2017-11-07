module.exports.Matrix = class Matrix {
	constructor() {
		this.rows = new Array();	
	}

	getRows() {
		return this.rows;
	}

	getColumns() {
		let columns = new Array();

		for (let i = 0; i < this.getWidth(); i++) {
			columns.push(new Array());

			for (let row of this.rows)
				columns[i].push(row[i]);
		}

		return columns;
	}

	getWidth() {
		return this.rows.length > 0 ? this.rows[0].length : 0;
	}

	getHeight() {
		this.rows.length;
	}

	toString() {
		let s = '';

		for (let row of this.rows) {
			for (let element of row)
				s += String(element).padStart(5);

			s += '\n';
		}

		return s;
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
		if (this.rows.length > 0)
			console.assert(this.rows.length === newColumn.length, 'New column is not of the same length as existing matrix');

		if (this.rows.length === 0)
			for (let i = 0; i < newColumn.length; i++) {
				this.rows.push(new Array());
				this.rows[i].push(newColumn[i]);
			}
		else
			for (let i = 0; i < this.rows.length; i++)
				this.rows[i].push(newColumn[i]);
	}

	insertColumn(index, newColumn) {
		if (this.rows.length > 0)
			console.assert(this.rows.length === newColumn.length, 'New column is not of the same length as existing matrix');
		
		if (this.rows.length === 0)
			for (let i = 0; i < newColumn.length; i++) {
				this.rows.push(new Array());
				this.rows[i].splice(index, 0, newColumn[i]);
			}
		else
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