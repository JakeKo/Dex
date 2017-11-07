var Test = require('tape');
var TapSpec = require('tap-spec');
Test.createStream().pipe(TapSpec()).pipe(process.stdout);

var Collection = require('../js/collection.js');
var Graph = require('../js/graph.js');
var Number = require('../js/number.js');

Test('The Matrix class, when adding rows,', (assert) => {
	let m = new Collection.Matrix();
	m.pushRow([1, 2, 3]);
	assert.equal(m.rows.length, 1, 'adds a row with pushRow()');
	m.pushRow([4, 5, 6]);
	assert.equal(m.rows.length, 2, 'adds another row with pushRow()');
	m.pushRow([7, 8, 9]);
	assert.equal(m.rows.length, 3, 'adds another row with pushRow()');
	assert.deepEqual(m.getRows(), [[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'returns the correct structure with getRows()');
	assert.end();
});

Test('The Matrix class, when adding columns,', (assert) => {
	let m = new Collection.Matrix();
	m.pushColumn([1, 2, 3], 'adds a column with pushColumn()');
	assert.equal(m.rows[0].length, 1);
	m.pushColumn([4, 5, 6], 'adds another column with pushColumn()');
	assert.equal(m.rows[0].length, 2);
	m.pushColumn([7, 8, 9], 'adds another column with pushColumn()');
	assert.equal(m.rows[0].length, 3);
	assert.deepEqual(m.getColumns(), [[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'returns the correct structure with getColumns()');
	assert.end();
});

Test('The Matrix class, when inserting rows,', (assert) => {
	let m = new Collection.Matrix();
	m.insertRow(2, [7, 8, 9]);
	assert.equal(m.rows.length, 1, 'inserts a row with insertRow()');
	m.insertRow(0, [1, 2, 3]);
	assert.equal(m.rows.length, 2, 'inserts another row with insertRow()');
	m.insertRow(1, [4, 5, 6]);
	assert.equal(m.rows.length, 3, 'inserts another row with insertRow()');
	assert.deepEqual(m.getRows(), [[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'returns the correct structure with getRows()');
	assert.end();
});

Test('The Matrix class, when inserting columns,', (assert) => {
	let m = new Collection.Matrix();
	m.insertColumn(2, [7, 8, 9]);
	assert.equal(m.rows[0].length, 1, 'inserts a row with insertColumn()');
	m.insertColumn(0, [1, 2, 3]);
	assert.equal(m.rows[0].length, 2, 'inserts another row with insertColumn()');
	m.insertColumn(1, [4, 5, 6]);
	assert.equal(m.rows[0].length, 3, 'inserts another row with insertColumn()');
	assert.deepEqual(m.getColumns(), [[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'returns the correct structure with getColumns()');
	assert.end();
});

Test('The Matrix class, when adding rows and columns,', (assert) => {
	let m = new Collection.Matrix();
	m.pushRow([1, 2, 3], 'adds a row with pushRow()');
	m.pushRow([6, 7, 8], 'adds another row with pushRow()');
	m.pushColumn([4, 9], 'adds a column with pushColumn()');
	m.pushColumn([5, 10], 'adds another column with pushColumn()');
	assert.deepEqual(m.getRows(), [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], 'returns the correct structure with getRows()');
	assert.end();
});

Test('The Matrix class, when inserting rows and columns,', (assert) => {
	let m = new Collection.Matrix();
	m.insertRow(4, [1, 2, 3], 'adds a row with insertRow()');
	m.insertRow(1, [6, 7, 8], 'adds another row with insertRow()');
	m.insertColumn(0, [4, 9], 'adds a column with insertColumn()');
	m.insertColumn(1, [5, 10], 'adds another column with insertColumn()');
	assert.deepEqual(m.getRows(), [[4, 5, 1, 2, 3], [9, 10, 6, 7, 8]], 'returns the correct structure with getRows()');
	assert.end();
});