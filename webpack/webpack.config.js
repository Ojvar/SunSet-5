const Global = require("./helpers/global");

module.exports = {
    mode: Global.mode,

    entry: Global.getEntries(),
    output: Global.loadModule("output")(),
    module: Global.loadModule("module")(),
    plugins: Global.loadModule("plugins")(),
    resolve: Global.loadModule("resolve")(),
    optimization: Global.loadModule("optimization")(),
};
