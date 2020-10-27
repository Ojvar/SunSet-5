"use strict";

function ObjectHelper() {}
module.exports = ObjectHelper;

/**
 * Flatter
 * @param {object} obj Input object
 */
ObjectHelper.flatter = function flatter(obj) {
  let result = {};
  Object.values(obj).forEach((x) => (result = { ...result, ...x }));

  return result;
};
