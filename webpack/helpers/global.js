const Path = require("path");

module.exports = {
    devMode: process.env.NODE_ENV == "development",

    loadModule: (name) => require(Path.resolve("webpack/modules", name)),
};
