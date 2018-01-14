'use strict';

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tape = require('gulp-tape');
const tapColorize = require('tap-colorize');
 
gulp.task('typescript js', () => {
    return gulp.src('./src/ts/*.ts')
        .pipe(typescript({
            noImplicitAny: true,
			removeComments: true,
			target: 'es6',
			moduleResolution: 'classic',
			module: 'commonjs',
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', [
	'typescript js',
]);

gulp.task('test', () => {
	return gulp.src('./test/*.test.js')
		.pipe(tape({
			reporter: tapColorize(),
		}));
});