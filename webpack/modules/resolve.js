"use strict";

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/**
 * Export
 */
module.exports = (env = {}) => {
  return {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".pug", ".json"],
    plugins: [new TsconfigPathsPlugin({})],
  };
};
