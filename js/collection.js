module.exports.Matrix = class Matrix {
	constructor(defaultElement) { }

	// Returns an array of arrays representing the rows in the matrix
	getRows() { }

	// Returns an array representing the row at the specified index
	// Returns undefined if the index is not in rows
	getRow(index) { }

	// Returns an array of arrays representing the columns in the matrix
	getColumns() { }
	
	// Returns an array representing the column at the specified index
	// Returns undefined if the index is not in columns
	getColumn(index) { }

	// Returns the length of the rows in the matrix
	// Returns 0 if there are no rows
	getWidth() { }

	// Returns the number of rows in the matrix
	getHeight() { }

	// Returns a string of the matrix elements
	toString() { }

	// Adds a new row to the matrix at the specified index
	// Fills the row with the default element if the new row is empty or undefined
	// Returns false if the new row does not match the width of the matrix
	addRow(index, newRow) { }

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
	isSquare() { }

	// Returns true if there are no elements in the matrix
	isEmpty() { }

	// Returns true if the matrix's elements are completely described by the elements in the specified array
	isEnumerated(enums) { }
}