'use strict';

var gulp       = require('gulp'),
    requireDir = require('require-dir'),
    $          = require('gulp-load-plugins')();

// Load application tasks
(function () {
  var dir = requireDir('./tasks');

  Object.keys(dir).forEach(function (key) {
    dir[key] = dir[key](gulp, $);
  });
}());

$.karma = require('karma');

gulp.task('build', gulp.series('clean', 'styles', 'styles:copy-source', 'jscs', 'jshint', 'uglify'));

gulp.task('deploy', gulp.series('clean:deploy', function () {
  return gulp.series('website');
}));

gulp.task('serve', function () {
  return gulp.series('connect', 'watch', 'open');
});

gulp.task('test', function () {
  return gulp.series('karma');
});
