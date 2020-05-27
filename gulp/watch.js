/*
  watch.js
  ===========
  watches sass/js/images
  watches test/
  watches sass/*.scss
*/

const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('./config/config.json')


gulp.task('watch', function (done) {
  runSequence('watch-sass',
               'watch-assets', 
               'watch-code-quality',
               done)
})

gulp.task('watch-sass', function () {
  return gulp.watch([config.paths.assets + 'sass/**', config.paths.views + 'components/**'], {cwd: './'}, ['sass'])
})

gulp.task('watch-assets', function () {
  return gulp.watch(config.paths.assets + 'images/**', {cwd: './'}, ['copy-assets'])
})

gulp.task('watch-lint-sass', function () {
  return gulp.watch([config.paths.sass + '**/*.s+(a|c)ss', config.paths.views + 'components/**/*.s+(a|c)ss'], ['lint-sass'])
})

gulp.task('watch-lint-js', function () {
  return gulp.watch([
    config.paths.assets + '**/*.js', 
    config.paths.views + '/**/*.js', 
    config.paths.tests + '/**/*.js'], 
    ['lint-js', 'webpack'])
})

gulp.task('watch-test', function () {
  return gulp.watch([
    './app/filters.js',
    config.paths.assets + '/**/*.js',
    config.paths.views + '/**/*.js',
    config.paths.tests + '/**/*.test.js'], 
  ['test'])
})

gulp.task('watch-code-quality', function () {
  return runSequence(['watch-lint-sass', 'watch-lint-js', 'watch-test'])
})
