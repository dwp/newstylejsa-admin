/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp')
const config = require('./config/config.json')

gulp.task('copy-assets', function () {
  return gulp.src([config.paths.assets + '/**', '!' + config.paths.assets + 'sass{,/**/*}',
    '!' + config.paths.js + '/**/*'])
  .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-documentation-assets', function () {
  return gulp.src(['!' + config.paths.docsAssets + 'sass{,/**/*}',
    config.paths.docsAssets + '/**'])
  .pipe(gulp.dest(config.paths.public))
})
