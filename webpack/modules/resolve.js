"use strict";

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/**
 * Export
 */
module.exports = (env = {}) => {
  const Path = require("path");

  return {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".pug", ".json"],
    plugins: [new TsconfigPathsPlugin({})],
    alias: {
      "@FONTS": Path.resolve("src/frontend/fonts"),
      "@IMAGES": Path.resolve("src/frontend/images"),
      "@SCRIPTS": Path.resolve("src/frontend/scripts"),
      "@STYLES": Path.resolve("src/frontend/styles"),
    },
  };
};
