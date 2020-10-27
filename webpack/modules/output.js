"use strict";

const Path = require("path");

/**
 * Export
 */
module.exports = (env = {}) => {
  const isProd = env.PRODUCTION || false;

  return {
    path: Path.resolve("dist"),
    publicPath: "/",
    filename: isProd ? "[name]-[contenthash].js" : "[name].js",
  };
};
