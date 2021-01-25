"use strict";

const Path = require("path");

module.exports = (env, entries) => ({
  entry: getEntries(env, entries),
  output: getOutput(env, entries),
  module: getModule(env, entries),
  plugins: getPlugins(env, entries),
  resolve: getResolve(env, entries),
});

/**
 * Get entires
 */
function getEntries(env, entries) {
  const ObjectHelper = require(Path.resolve(
    __dirname,
    "helpers/object-helper",
  ));

  return ObjectHelper.flatter(entries);
}

/**
 * Get output
 */
function getOutput(env, entries) {
  const OutputModule = require(Path.resolve(__dirname, "modules/output"));

  return OutputModule(env);
}

/**
 * Get module
 */
function getModule(env, entries) {
  const ModuleModule = require(Path.resolve(__dirname, "modules/module"));

  return ModuleModule(env);
}

/**
 * Get plugins
 */
function getPlugins(env, entries) {
  const PluginsModule = require(Path.resolve(__dirname, "modules/plugins"));

  return PluginsModule(env, entries);
}

/**
 * Get resolve
 */
function getResolve(env, entries) {
  const ResolveModule = require(Path.resolve(__dirname, "modules/resolve"));

  return ResolveModule(env);
}
