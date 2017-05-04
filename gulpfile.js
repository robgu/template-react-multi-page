const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const vfs = require('vinyl-fs');
const webpackConfig = require('./webpack.config');

require('es6-promise').polyfill();

function startWebpackDevServer(config) {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
    },
  }).listen(8080, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080');
  });
}

gulp.task('webpack-dev-server', () => {
  startWebpackDevServer(webpackConfig.dev);
});


gulp.task('dev', ['webpack-dev-server']);

gulp.task('dist', () => {
  return gulp.src(['./modules/moduleA.js','./modules/moduleB.js',])
      .pipe(webpackStream(webpackConfig.dev, webpack))
      .pipe(gulp.dest('deploy'));
});

