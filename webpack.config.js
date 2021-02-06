"use strict";

const entries = {
    scripts: {
        "pages/home": "./src/frontend/scripts/pages/home.ts",
    },
    styles: {
        app: "./src/frontend/styles/app.scss",
        "pages/home": "./src/frontend/styles/pages/home.scss",
    },
    copy: {},
};

/**
 * Run function
 */
function run(env = {}) {
    let files = {};

    files = {
        ...convertItems("scripts__", entries.scripts),
        ...convertItems("styles__", entries.styles),
    };

    return require("./webpack/webpack.common.js")(env, files);
}

/**
 * Convert Item names
 */
function convertItems(prefix, items) {
    let newItems = {};

    Object.keys(items).forEach((x) => {
        const key = prefix + x.replace(/[\/\\]/gi, "__");
        newItems[key] = items[x];
    });

    return newItems;
}

/* Export */
module.exports = run;