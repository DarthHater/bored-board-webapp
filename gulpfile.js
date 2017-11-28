var gulp = require('gulp'),
    browserify = require('browserify'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    ts = require('gulp-typescript'),
    typescript = require('typescript'),
    source = require('vinyl-source-stream'),
    connect = require('gulp-connect');

var dist = 'dist';
var tmp = '.tmp';

var tsProject = ts.createProject('src/tsconfig.json', {typescript: typescript});

gulp.task('html', function() {
  gulp.src('src/**/*.html')
      .pipe(gulp.dest(dist));
});

gulp.task('favicon', function() {
  gulp.src('src/favicon/*.ico')
      .pipe(gulp.dest(dist));
});

gulp.task('compile', function () {
    var result = gulp.src('src/**/*{ts,tsx}')
        .pipe(tsProject());
    return result.js.pipe(gulp.dest(tmp));
});

gulp.task('bundle', ['html','compile'], function () {
    var b = browserify(tmp + '/bootstrap.js');
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dist));
});

gulp.task('sass', function() {
  gulp.src('./src/stylesheets/**/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(dist + '/css'));

});

gulp.task('watch', function() {
  gulp.watch('src/stylesheets/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: dist,
    livereload: true,
    port: 9999
  });
});

gulp.task('default', ['sass', 'html', 'favicon', 'connect', 'watch'], function () {
  console.log('Building the project ...');
});