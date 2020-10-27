"use strict";

const entries = {
  scripts: {
    "scripts/app": "./src/frontend/scripts/app.ts",
  },
  styles: {
    "styles/app": "./src/frontend/styles/app.css",
    "styles/app2": "./src/frontend/styles/app.scss",
  },
  files: {},
  directories: {},
};

/* Export */
module.exports = (env = {}) => {
  if (env.PRODUCTION) {
    return require("./webpack/webpack.prod")(env, entries);
  } else {
    return require("./webpack/webpack.dev")(env, entries);
  }
};
