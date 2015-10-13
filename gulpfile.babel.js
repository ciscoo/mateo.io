'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('zip', () => {
  return gulp.src('./build/**/*')
    .pipe($.zip('archive.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('copy-index', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-images', () => {
  return gulp.src('./src/img/**')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('sass', () => {
  return gulp.src([
    './src/styles/**/*.scss'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['./bower_components/susy/sass', './bower_components/normalize-css'],
      precision: 10,
      //onError: console.error.bind(console, 'Sass Error:')
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['> 5%','last 2 versions'],
      cascade: true
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('serve', ['sass', 'copy-index', 'copy-images'], () => {
  browserSync({
    server: './build'
  });

  gulp.watch('./src/styles/**/*.scss', ['sass', reload]);
  gulp.watch('./src/**/*.html', ['copy-index', reload]);
});

gulp.task('build', ['sass'])

gulp.task('default', ['serve']);
