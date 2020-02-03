'use strict';

const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');

const src = ['globcat.js', 'test/**/*.js', 'bin/**/*.js'];

gulp.task('default', function() {
  return gulp.src(src)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(mocha())
    .once('error', () => process.exit(1))
    .once('end', () => process.exit());
});
