'use strict';

const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');

const src = ['globcat.js', 'test/**/*.js', 'bin/**/*.js'];

gulp.task('style', function() {
  return gulp.src(src)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('lint', function() {
  return gulp.src(src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['style', 'lint']);
