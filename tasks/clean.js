'use strict';

var del = require('del');

module.exports = function (gulp, $) {
  gulp.task('clean', async function () {
    del.sync('dist');
  });

  gulp.task('clean:examples', async function () {
    del.sync('examples/source');
  });

  gulp.task('clean:deploy', async function () {
    del.sync('.tmp/website');
  });
};
