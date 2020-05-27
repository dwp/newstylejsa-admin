/*
  sass.js
  ===========
  compiles sass from assets folder
  also includes sourcemaps
*/

const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const gulpif = require('gulp-if')

const config = require('./config/config.json')

const ENVS = {
  PROD: 'prod',
  DEV: 'dev'
}

const getEnv = () => {
  const params = global.process.argv
  let env = ENVS.DEV

  Object.keys(params).forEach((key) => {
    const param = params[key]

    if (param.includes('-env')) {
      const [, envValue] = param.split('=')
      env = envValue
    }
  })

  return env
}

const isProdEnv = getEnv() === ENVS.PROD
const isDevEnv = !isProdEnv

gulp.task('sass', function () {
  return gulp.src([config.paths.assets + 'sass/*.s+(a|c)ss', config.paths.views + 'components/**/.s+(a|c)ss'])
  .pipe(gulpif(isDevEnv, sourcemaps.init()))
  .pipe(gulpif(isDevEnv, sass({includePaths: [config.paths.views + 'components/'], outputStyle: 'expanded'}).on('error', sass.logError)))
  .pipe(gulpif(isProdEnv, sass({includePaths: [config.paths.views + 'components/'], outputStyle: 'compressed'}).on('error', sass.logError)))
  .pipe(gulpif(isDevEnv, sourcemaps.write()))
  .pipe(gulp.dest(config.paths.public + '/stylesheets/'))
})
