const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('default', ['babel', 'test']);

gulp.task('babel', () => {
	return gulp.src('src/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		// .pipe(sourcemaps.write())
		.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src/'}))
		.pipe(gulp.dest('lib'));
});

gulp.task('test', ['babel'], () => {
	return gulp.src('test/**/*.js', { read: false })
		.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('watch', () => {
	gulp.watch('src/**/*.js', ['babel']);
	gulp.watch('test/**/*.js', ['test']);
});

gulp.task('tsd', ['babel'], (cb) => {
	require('./')(require('./package.json'), { stdio: 'inherit' }, cb);
});

gulp.task('clean', () => {
	return del(['test/typings/**', 'test/tsd.json']);
});