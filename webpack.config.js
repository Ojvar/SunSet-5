"use strict";

const entries = {
    scripts: {
        // "pages/home": "./src/frontend/scripts/pages/home.ts",
        "pages/auth": "./src/frontend/scripts/pages/auth/login.ts",
    },
    styles: {
        app: "./src/frontend/styles/app.scss",
        "pages/home": "./src/frontend/styles/pages/home.scss",
    },
};

/**
 * Run function
 */
module.exports = ((env = {}) => {
    return require("./webpack/webpack.common.js")(env, entries);
})();
