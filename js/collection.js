module.exports.Matrix = class Matrix {
	constructor() {
		this.rows = new Array();	
	}

	// Returns an array of arrays representing the rows in the matrix
	getRows() {
		return this.rows;
	}

	// Returns an array of arrays representing the columns in the matrix
	getColumns() {
		let columns = new Array();

		for (let i = 0; i < this.getWidth(); i++) {
			columns.push(new Array());

			for (let row of this.rows)
				columns[i].push(row[i]);
		}

		return columns;
	}

	// Returns the length of the rows in the matrix
	getWidth() {
		return this.rows.length > 0 ? this.rows[0].length : 0;
	}

	// Returns the number of rows in the matrix
	getHeight() {
		this.rows.length;
	}

	// Returns a string of the matrix elements
	toString() {
		let s = '';

		for (let row of this.rows) {
			for (let element of row)
				s += String(element).padStart(5);

			s += '\n';
		}

		return s;
	}

	// Adds a new row to the end of the matrix
	pushRow(newRow) {
		// The new row must be of the same length as the other rows in the matrix
		if (!this.isEmpty() && this.rows[0].length !== newRow.length) return false;

		this.rows.push(newRow);
		return true;
	}

	// Adds a new row to the matrix at the specified index
	insertRow(index, newRow) {
		// The new row must be of the same length as the other rows in the matrix
		if (!this.isEmpty() && this.rows[0].length !== newRow.length) return false;

		this.rows.splice(index, 0, newRow);
		return true;
	}

	// Adds a new column to the end of the matrix
	pushColumn(newColumn) {
		// The new column must be of the same length as the matrix
		if (!this.isEmpty() && this.rows.length !== newColumn.length) return false;

		if (this.rows.length === 0)
			for (let i = 0; i < newColumn.length; i++) {
				this.rows.push(new Array());
				this.rows[i].push(newColumn[i]);
			}
		else
			for (let i = 0; i < this.rows.length; i++)
				this.rows[i].push(newColumn[i]);

		return true;
	}

	// Adds a new column to the matrix at the specified index
	insertColumn(index, newColumn) {
		// The new column must be of the same length as the matrix
		if (!this.isEmpty() && this.rows.length !== newColumn.length) return false;

		if (this.rows.length === 0)
			for (let i = 0; i < newColumn.length; i++) {
				this.rows.push(new Array());
				this.rows[i].splice(index, 0, newColumn[i]);
			}
		else
			for (let i = 0; i < this.rows.length; i++)
				this.rows[i].splice(index, 0, newColumn[i]);

		return true;
	}

	// Removes and returns the last row in the matrix
	popRow() {
		return this.rows.pop();
	}

	// Removes and returns the row in the matrix at the specified index
	removeRow(index) {
		return this.rows.splice(index, 1);
	}

	// Removes and returns the last column in the matrix
	popColumn() {
		let column = new Array();

		for (let i = 0; i < this.rows.length; i++)
			column.push(this.rows[i].pop());

		return column;
	}

	// Removes and returns the column in the matrix at the specified index
	removeColumn(index) {
		let column = new Array();

		for (let i = 0; i < this.rows.length; i++)
			column.push(this.rows[i].splice(index, 1)[0]);

		return column;
	}

	// Returns true if the height and width of the matrix are equal
	isSquare() {
		return this.isEmpty() ? true : this.getHeight() === this.getWidth();
	}

	// Returns true if there are no elements in the matrix
	isEmpty() {
		return this.getHeight() === 0 || this.getWidth() === 0;
	}

	// Returns true if the matrix's elements are completely described by the elements in the specified array
	isEnumerated(enums) {
		for (let row of this.rows)
			for (let element of row)
				if (!enums.includes(element)) return false;

		return true;
	}
}