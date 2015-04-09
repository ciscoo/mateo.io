'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'dev/build'
    }
  });
});

gulp.task('clean', function () {
  return gulp.src('dist/')
    .pipe($.clean());
});

gulp.task('jekyll:build', $.shell.task('jekyll build'));

gulp.task('sass', function () {
  return gulp.src([
    'dev/styles/*.scss'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass Error:')
    }))
    .pipe($.autoprefixer(['last 2 versions, > 5%'], {
      cascade: true
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dev/css/'));
});
