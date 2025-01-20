const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');

// Load .env.production file
const envPath = path.resolve(__dirname, '.env.production');
const fileEnv = dotenv.parse(fs.readFileSync(envPath));

// Merge the environment variables with NODE_ENV set to 'production'
const envKeys = {
  ...fileEnv,
  NODE_ENV: 'production',
};

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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envKeys),
    }),
  ],
});