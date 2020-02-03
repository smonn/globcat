var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

var src = ['globcat.js', 'test/**/*.js', 'bin/**/*.js'];

gulp.task('style', function() {
    return gulp.src(src)
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('lint', function () {
    return gulp.src(src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['style', 'lint']);
