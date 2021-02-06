const Path = require("path");

module.exports = () => ({
    rules: [
        {
            test: /\.pug$/i,
            exclude: /node_modules/,
            oneOf: [
                {
                    resourceQuery: /^\?vue/,
                    use: ["pug-plain-loader"],
                },
                {
                    use: ["raw-loader", "pug-plain-loader"],
                },
            ],
        },

        {
            test: /\.vue$/,
            loader: "vue-loader",
        },

        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        {
            test: /\.js$/,
            loader: "babel-loader",
        },

        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
            test: /\.css$/,
            use: ["vue-style-loader", "css-loader"],
        },

        {
            test: /\.tsx?$/,
            use: {
                loader: "ts-loader",
                options: {
                    configFile: Path.resolve("webpack/tsconfig.webpack.json"),
                    transpileOnly: true,
                },
            },
            exclude: /node_modules/,
        },
    ],
});
