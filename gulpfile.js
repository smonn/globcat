'use strict';

const gulp = require('gulp');
const jscs = require('gulp-jscs');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

const src = ['globcat.js', 'test/**/*.js', 'bin/**/*.js'];

gulp.task('test', function() {
  return gulp.src(src[1])
    .pipe(mocha());
});

gulp.task('lint', function() {
  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('cs', function() {
  return gulp.src(src)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('watch', function() {
  return gulp.watch(src, ['default']);
});

gulp.task('default', ['test', 'lint', 'cs']);
