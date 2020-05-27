/*
  rename.js
  ===========
  Rename the asset files to reflect minified state and current version
*/

const gulp = require('gulp')
const path = require('path')
const rename = require('gulp-rename')
const del = require('del');
const vinylPaths = require('vinyl-paths');

const config = require('./config/config.json')
const versionConfig = require('./config/asset-version.json')

const version = `${versionConfig.major}.${versionConfig.minor}.${versionConfig.revision}`
const files = [path.resolve(`${config.paths.public}/stylesheets/**/*.*`), path.resolve(`${config.paths.public}/javascripts/**/*.*`)]

gulp.task('rename', function (done) {
  return gulp.src(files,  {base: config.paths.public})
    .pipe(vinylPaths(del))
    .pipe(rename({suffix: `-${version}-min`}))
    .pipe(gulp.dest(config.paths.public))
})
