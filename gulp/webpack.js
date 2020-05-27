/*
  webpack.js
  ===========
*/

const gulp = require('gulp')
const chalk = require('chalk')
const webpack = require('webpack-stream')
const merge = require('webpack-merge')
const webpackDefaults = require('./config/webpack.multi-config.js')
const config = require('./config/config.json')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify-es').default

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

const customConfig = {}

if (isProdEnv) {
  customConfig.mode = 'production'
}

const webpackSettings = merge(webpackDefaults, customConfig)

gulp.task('webpack', function (done) {
  // console.log(chalk.black.bgMagenta('\n  [Webpack] settings: '))
  // console.log(webpackSettings)

  return gulp.src([config.paths.js, '**/*.*.js'])
    .pipe(webpack(webpackSettings))
    .pipe(gulpif(isProdEnv, uglify()))
    .pipe(gulp.dest(config.paths.public + 'javascripts/'), done)
})