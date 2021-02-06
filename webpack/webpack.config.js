const Global = require("./helpers/global");

module.exports = {
    entry: {
        home: "./resources/scripts/home.ts",
    },

    output: Global.loadModule("output")(),
    module: Global.loadModule("module")(),
    plugins: Global.loadModule("plugins")(),
    resolve: Global.loadModule("resolve")(),
    optimization: Global.loadModule("optimization")(),
    mode: Global.devMode ? "development" : "production",
};
