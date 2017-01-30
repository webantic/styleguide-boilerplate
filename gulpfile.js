'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const styleguide = require('devbridge-styleguide')
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./library'))
    .pipe(browserSync.stream())
})

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './',
    open: false,
    scrollRestoreTechnique: 'cookie'
  })

  gulp.watch('./scss/**/*.scss', ['sass'])
  gulp.watch(['./scss/**/*.scss', './library/content/**/*.*', './library/db/**/*.*', './library/js/**/*.*', './library/index.html', './library/template.html']).on('change', browserSync.reload)
})

gulp.task('start-styleguide', function () {
  styleguide.startServer({
    styleguidePath: 'library'
  })
})

gulp.task('default', ['start-styleguide', 'sass', 'serve'])
