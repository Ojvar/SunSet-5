const Path = require("path");
const Global = require("./global");

module.exports = (devMode) => ({
    path: Path.resolve("dist/public"),

    filename: (chunk) => {
        const name = chunk.chunk.name + ".js";
        return name.startsWith("styles__") ? name : Global.convertName(name);
    },

    chunkFilename: (chunk) => {
        const name = chunk.chunk.name + ".js";
        return name.startsWith("styles__") ? name : Global.convertName(name);
    },
});
