"use strict";

const _ = require("lodash");
const Path = require("path");

module.exports = (env, entries) => {
  const commonConfigs = getCommonConfig(env, entries);
  const localConfigs = getLocalConfig(env, entries);

  return _.merge({}, commonConfigs, localConfigs);
};

/**
 * Load common config file
 * @param {object} env Environment data
 * @param {object} entries Entries data
 */
function getCommonConfig(env, entries) {
  return require(Path.resolve(__dirname, "webpack.common"))(env, entries);
}

/**
 * Get config data
 * @param {object} env Environment data
 * @param {object} entries Entries data
 */
function getLocalConfig(env, entries) {
  return {
    mode: "development",
    devtool: "cheap-module-source-map",
  };
}
