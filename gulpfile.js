'use strict';

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const typescriptProject = typescript.createProject('tsconfig.json');
const tape = require('gulp-tape');

gulp.task('typescript', () => {
    return typescriptProject.src()
        .pipe(typescriptProject())
        .js.pipe(gulp.dest('./dist/js'));
});

gulp.task('default', [
	'typescript',
]);

gulp.task('test', () => {
	return gulp.src('./test/*.test.js')
		.pipe(tape());
});