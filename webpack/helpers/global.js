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
        const Entries = require("../../webpack.entries");

        return Entries;
    },
};
