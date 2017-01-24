var config      = require('./config');

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var shell       = require('gulp-shell');
var runSequence = require('run-sequence').use(gulp);

var distDir = config.distDir + config.templateDir

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
      baseDir: distDir,
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