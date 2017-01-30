'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const styleguide = require('devbridge-styleguide')
const sassGlob = require('gulp-sass-glob')

gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./library'))
    .pipe(browserSync.stream())
})

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './',
    open: false
  })

  gulp.watch('./scss/**/*.scss', ['sass'])
  gulp.watch(['./library/content/**/*.*', './library/db/**/*.*', './library/js/**/*.*', './library/*.*']).on('change', browserSync.reload)
})

gulp.task('start-styleguide', function () {
  styleguide.startServer({
    styleguidePath: 'library'
  })
})

gulp.task('default', ['start-styleguide', 'sass', 'serve'])
