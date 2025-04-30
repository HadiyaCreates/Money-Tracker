
// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",

const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      http: require.resolve("stream-http"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      fs: false,
      net: false,
      url: false,
      https: false,
      os: false,
      buffer: false,
      process: require.resolve('process/browser'),
      vm: false,
      console: false,
      assert: false,
      constants: false,
      domain: false,
      events: false,
      timers: false,
      util: false,
    },
  }),
);