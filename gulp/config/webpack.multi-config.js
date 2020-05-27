const webpack = require('webpack')

module.exports = {
  mode: 'development',
  
  performance: {
    hints: false
  },
  
  entry: {
    'dwp-jsa-admin-prototype': './app/assets/javascripts/dwp-jsa-admin-prototype.js',
    'dwp-jsa-admin-application': './app/assets/javascripts/dwp-jsa-admin-application.js'
  },
  
  output: {
    filename: '[name].js'
  },

  resolve: {
    modules: [
      'node_modules',
      'modules',
      'app/views/components'
    ],
    extensions: ['.js', '.json']
  },

  plugins: [],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }  
    ]
  }
}
