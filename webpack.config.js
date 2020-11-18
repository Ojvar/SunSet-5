"use strict";

const entries = {
  scripts: {
    "scripts/app": "./src/frontend/scripts/app.ts",
  },
  styles: {
    "styles/app": "./src/frontend/styles/app.scss",
  },
  copy: {
    "./src/frontend/images": "images",
    "./src/frontend/fonts": "fonts",
  },
};

/* Export */
module.exports = (env = {}) => {
  if (env.PRODUCTION) {
    return require("./webpack/webpack.prod")(env, entries);
  } else {
    return require("./webpack/webpack.dev")(env, entries);
  }
};
