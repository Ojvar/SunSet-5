const Global = require("./modules/global");

module.exports = (env, entries) => {
    let result = {
        mode: Global.webpackMode,

        entry: entries,
        output: Global.loadModules("output", entries),
        plugins: Global.loadModules("plugins", entries),
        module: Global.loadModules("module", entries),
        resolve: Global.loadModules("resolve", entries),
        optimization: Global.loadModules("optimization", entries),
    };

    return result;
};
