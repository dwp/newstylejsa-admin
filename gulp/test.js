/*
  test.js
  ===========
  defaults wraps generate-assets, watch and server
*/

const gulp = require('gulp')
const mocha = require('gulp-mocha')
const config = require('./config/config.json')

gulp.task('test', function (done) {
  return gulp.src(config.paths.tests, {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      globals: {
        describe: ''
      }
    }))
})
