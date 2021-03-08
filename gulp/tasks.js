/*
  tasks.js
  ===========
  defaults wraps generate-assets, watch-code-quality, watch and server
*/

const gulp = require('gulp')
const mocha = require('gulp-mocha')
const runSequence = require('run-sequence')

gulp.task('generate-assets', function (done) {
  runSequence('clean',
                'sass',
                'copy-assets',
                'copy-documentation-assets',
                'webpack'
                , done)
})

gulp.task('default', function (done) {  
  runSequence(
    //'lint-sass',
    // 'lint-js',
    'test',
    'generate-assets',
    'watch',
    'server', done)
})

gulp.task('build', function (done) {
  runSequence(
    // 'lint-js:strict',
    // 'lint-sass:strict',
    'generate-assets',
    // 'rename',
    done)
})
