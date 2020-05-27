/*
  lint.js
  ===========
  defaults 
*/

const gulp = require('gulp')
const eslint = require('gulp-eslint')
const sassLint = require('gulp-sass-lint')
const config = require('./config/config.json')

gulp.task('lint-js', function (done) {
  return gulp.src([
    config.paths.assets + '**/*.js', 
    config.paths.views + '/**/*.js', 
    config.paths.tests + '/**/*.js'])
    .pipe(eslint({configFile: 'gulp/config/eslint.config.json'}))
    .pipe(eslint.format(), done)
})

gulp.task('lint-js:strict', function (done) {
  return gulp.src([
    config.paths.assets + '**/*.js', 
    config.paths.views + '/**/*.js', 
    config.paths.tests + '/**/*.js'])
    .pipe(eslint({configFile: 'gulp/config/eslint.config.json'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError(), done)
})

gulp.task('lint-sass', function (done) {
  return gulp.src([config.paths.sass + '**/*.s+(a|c)ss'])
    .pipe(sassLint({
      options: {
        'config-file': 'gulp/config/sass-lint.yml'
      }
    }))
    .pipe(sassLint.format())
})

gulp.task('lint-sass:strict', function (done) {
  return gulp.src([config.paths.sass + '**/*.s+(a|c)ss'])
    .pipe(sassLint({
      options: {
        'config-file': 'gulp/config/sass-lint.yml'
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})
