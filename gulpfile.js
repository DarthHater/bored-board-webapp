var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    connect = require('gulp-connect');

gulp.task('html', function() {
  gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  gulp.src('./src/styles/**/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));

});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 9999
  });
});

gulp.task('default', ['sass', 'html', 'connect', 'watch'], function () {
  console.log('Building the project ...');
});