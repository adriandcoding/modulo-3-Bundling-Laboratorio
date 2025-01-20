const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');


const envPath = path.resolve(__dirname, '.env.production');
const fileEnv = dotenv.parse(fs.readFileSync(envPath));


const envKeys = {
  ...fileEnv,
  NODE_ENV: 'production',
};

module.exports = merge(common, bundleAnalyzer, {
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envKeys),
    }),
  ],
});