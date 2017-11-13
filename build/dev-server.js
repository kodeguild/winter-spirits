
require('./check-versions')();

const config = require('../config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');


const port = process.env.PORT || config.dev.port; // default port where dev server listens for incoming traffic
var autoOpenBrowser = !!config.dev.autoOpenBrowser; // automatically open browser, if not set will be false

// Define HTTP proxies to your custom API backend
// github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options));
})

app.use(require('connect-history-api-fallback')()); // handle fallback for HTML5 history API

app.use(devMiddleware); // serve webpack bundle output

// enable hot-reload and state-preserving compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

let _resolve;
const readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
  _resolve();
})

const server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
}
