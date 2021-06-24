'use strict';

module.exports = function (gulp, $) {

  gulp.task('styles:copy-source', function () {
    return gulp.src('source/*.css')
        .pipe(gulp.dest('dist'));
  });

  gulp.task('styles', function () {
    return gulp.src('source/*.css')
        .pipe($.cssnano({ safe: true }))
        .pipe($.rename('angular-ui-tree.min.css'))
        .pipe(gulp.dest('dist'));
  });

  gulp.task('connect', gulp.series('clean:examples', 'scripts:setup', 'styles', async function () {
    var livereloadPort = 35729;

    $.connect.server({
      port: 9000,
      livereload: {
        port: livereloadPort
      },
      root: 'examples',
      middleware: function (connect) {
        function mountFolder(connect, dir) {
          return connect.static(require('path').resolve(dir));
        }

        return [
          require('connect-livereload')({ port: livereloadPort }),
          mountFolder(connect, 'source'),
          mountFolder(connect, 'dist'),
          mountFolder(connect, 'bower_components'),
          mountFolder(connect, 'examples')
        ];
      }
    });
  }));

  gulp.task('watch', gulp.series('connect', async function () {
    gulp.watch([
      '.jshintrc',
      'source/**/*.js',
      'examples/**/*.html'
    ], function (event) {
      return gulp.src(event.path)
        .pipe($.connect.reload());
    });

    gulp.watch([
      '.jshintrc',
      'source/**/*.js'
    ], ['jshint', 'jscs', 'clean:examples', 'scripts:setup']);

    gulp.watch([
      'source/**/*.scss'
    ], ['styles']);

    gulp.watch([
      'examples/**/*.scss'
    ], ['styles:examples']);
  }));

  gulp.task('open', gulp.series('connect', async function () {
    require('open')('http://localhost:9000');
  }));

};
