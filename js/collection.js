module.exports.Matrix = class Matrix {
	constructor(defaultElement) {
		this.rows = new Map();
		this.defaultElement = defaultElement;
	}

	// Returns an array of arrays representing the rows in the matrix
	getRows() {
		return this.rows;
	}

	// Returns an array representing the row at the specified index
	// Returns undefined if the index is not in rows
	getRow(index) {
		return this.rows.get(index);
	}

	// Returns an array of arrays representing the columns in the matrix
	getColumns() { }
	
	// Returns an array representing the column at the specified index
	// Returns undefined if the index is not in columns
	getColumn(index) { }

	// Returns the length of the rows in the matrix
	// Returns 0 if there are no rows
	getWidth() {
		return this.getHeight() > 0 ? this.rows.peekValue().size : 0;
	}

	// Returns the number of rows in the matrix
	getHeight() {
		return this.rows.size;
	}

	// Returns a string of the matrix elements
	toString() { }

	// Adds a new row to the matrix at the specified index
	// Fills the row with the default element if the new row is empty or undefined
	// Returns false if the new row does not match the width of the matrix
	addRow(index, newRow = new Array()) {
		if (this.isEmpty()) {
			if (newRow.length === 0) return false; // NO-OP
			
			// TODO: Add a new row with each element having correct keys
		} else {
			// The new row must match the width of the matrix
			if (newRow.length !== this.getWidth()) return false;

			// If an empty array or no array is passed, the new row becomes an array of the default element
			if (newRow.length === 0) newRow = new Array(this.getWidth()).fill(this.defaultElement);

			// TODO: Add a new row with each element having correct keys
		}
	}

	// Adds a new column to the matrix at the specified index
	// Fills the column with the default element if the new column is empty or undefined
	// Returns false if the new column does not match the height of the matrix
	addColumn(index, newColumn) { }

	// Removes and returns the row in the matrix at the specified index
	removeRow(index) { }

	// Removes and returns the column in the matrix at the specified index
	removeColumn(index) { }

	// Returns true if the height and width of the matrix are equal
	// An empty matrix is considered square
	isSquare() {
		return this.getHeight() === this.getWidth();
	}

	// Returns true if there are no elements in the matrix
	isEmpty() {
		return this.getHeight() === 0 && this.getWidth() === 0;
	}

	// Returns true if the matrix's elements are completely described by the elements in the specified array
	isEnumerated(enums) {
		for (let row of this.rows.values())
			for (let element of row.values())
				if (!enums.includes(element)) return false;

		return true;
	}
}