module.exports = (devMode) => ({
    splitChunks: {
        chunks: "all",
        maxAsyncRequests: 30,
        minChunks: 1,

        cacheGroups: {
            vue: {
                chunks: "all",
                test: /[\\/]node_modules[\\/]vue/,
                name: `chunks/vue`,
            },

            commons: {
                chunks: "all",
                test: /[\\/]node_modules[\\/]/,
                name(module, chunks, cacheGroupKey) {
                    const chunkData = extractChunkData(
                        module,
                        chunks,
                        cacheGroupKey
                    );
                    const chunkFileName = chunkData.moduleFileName;

                    return `chunks/${chunkFileName}`;
                },
            },
        },
    },
});

/**
 * ExtractChunkData
 * @param {*} module
 * @param {*} chunk
 * @param {*} cacheGroupKey
 */
function extractChunkData(module, chunks, cacheGroupKey) {
    const moduleFileName = module
        .identifier()
        .split("/")
        .reduceRight((item) => item);

    const allChunksNames = chunks.map((item) => item.name).join("~");

    return {
        moduleFileName,
        allChunksNames,
        cacheGroupKey,
    };
}
