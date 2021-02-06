const webpackMode = process.env.NODE_ENV || "production";
const devMode = webpackMode == "development";

module.exports = {
    webpackMode,

    /**
     * Convert Items
     * @param {*} prefix
     * @param {*} items
     */
    convertItems: (prefix, items) => {
        let newItems = {};

        Object.keys(items).forEach((x) => {
            const key = prefix + x.replace(/[\/\\]/gi, "__");
            newItems[key] = items[x];
        });

        return newItems;
    },

    /**
     * Load modules
     * @param {*} name
     * @param {*} entries
     */
    loadModules: (name, entries) => require("./" + name)(devMode, entries),

    /**
     * Convert name
     */
    convertName: (name) => name.replace(/__/gi, "/"),
};
