const Path = require("path");

module.exports = {
    Path,

    devMode: process.env.NODE_ENV == "development",
    mode: this.devMode ? "development" : "production",

    /**
     * Load module
     * @param {*} name
     */
    loadModule: (name) => require(Path.resolve("webpack/modules", name)),

    /**
     * Return webpack entries as a flat-object
     */
    getEntries: () => {
        const { files } = require("../../webpack.entries");

        return files || {};
    },

    /**
     * Return webpack entries to copy
     */
    getCopies: () => {
        const { copy } = require("../../webpack.entries");

        return copy || [];
    },
};
