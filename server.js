// dev-server.js
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
const path = require('path');
var logger = require('morgan');

var app = express();
app.use(logger('dev'));

// webpack编译器
var compiler = webpack(webpackConfig.dev);

// webpack-dev-server中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.dev.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false
    }
});

app.use(express.static(path.join(__dirname, 'static')));

app.use(devMiddleware)
// 路由
app.get('/:viewname/:page?', function(req, res, next) {

    var viewname = req.params.viewname;
    if (!/\.(js|ico)/.test(viewname) ) {
      viewname += '.html'
    }

    var filepath = path.join(compiler.outputPath, viewname);

    console.error('response', filepath)

    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
      if (err) {
          // something error
          return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
});

module.exports = app.listen(8080, function(err) {
    if (err) {
        // do something
        return;
    }

    console.log('Listening at http://localhost:8080\n')
})
