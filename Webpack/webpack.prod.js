const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  cache: {
    type: 'filesystem',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});