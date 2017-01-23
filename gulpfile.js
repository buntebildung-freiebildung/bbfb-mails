var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var shell       = require('gulp-shell');
var runSequence = require('run-sequence').use(gulp);

gulp.task('default', function(callback) {
  runSequence(
    'precompile',
    'serve',
    'watch',
    callback
  );
});

gulp.task('reloadBrowser', function() {
  browserSync.reload();
});

gulp.task('precompile', shell.task([
  'npm run precompile'
]))

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist/',
      index: 'result-0.html'
    }
  });
});

gulp.task('reload', function(callback) {
  runSequence(
    'precompile',
    'reloadBrowser',
    callback
  );
});

// Static Server + watching scss/html files
gulp.task('watch', function() {
  gulp.watch('templates/**/*.*', ['reload']);
});