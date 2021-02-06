const webpackMode = process.env.NODE_ENV || "production";
const devMode = webpackMode == "development";

module.exports = {
    webpackMode,

    loadModules: (name, entries) => require("./" + name)(devMode, entries),

    /**
     * Convert name
     */
    convertName: (name) => name.replace(/__/gi, "/"),
};
