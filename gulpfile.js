'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('clean', function () {
  return gulp.src('./build')
    .pipe($.clean());
});

gulp.task('copy-index', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-images', function () {
  return gulp.src('./src/img/**')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('sass', function () {
  return gulp.src([
    './src/styles/**/*.scss'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['./bower_components/susy/sass'],
      precision: 10,
      //onError: console.error.bind(console, 'Sass Error:')
      errLogToConsole: true
    }))
    .pipe($.autoprefixer(['last 2 versions, > 5%'], {
      cascade: true
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('serve', ['sass', 'copy-index', 'copy-images'], function () {
  browserSync({
    server: './build'
  });

  gulp.watch('./src/styles/**/*.scss', ['sass', reload]);
  gulp.watch('./src/**/*.html', ['copy-index', reload]);
});

gulp.task('default', ['serve']);
