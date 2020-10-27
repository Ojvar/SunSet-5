"use strict";

const Path = require("path");

module.exports = (env, entries) => ({
  entry: getEntries(env, entries),
  output: getOutput(env, entries),
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
 * Get resolve
 */
function getResolve(env, entries) {
  const ResolveModule = require(Path.resolve(__dirname, "modules/resolve"));

  return ResolveModule(env);
}
