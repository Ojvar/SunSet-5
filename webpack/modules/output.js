const Path = require("path");
const Global = require("../helpers/global");

const postfix = Global.devMode ? "" : ".[contenthash]";

module.exports = () => ({
    path: Path.resolve("./dist/public"),
    publicPath: "/",
    filename: `[name]${postfix}.js`,
});
