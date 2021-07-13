module.exports = {
    files: {
        /* Scripts */
        "scripts/pages/home/index": "./resources/scripts/pages/home/index.ts",
        "scripts/pages/auth/login": "./resources/scripts/pages/auth/login.ts",
        "scripts/pages/errors/500": "./resources/scripts/pages/errors/500.ts",

        /* Styles */
        "styles/pages/errors/500": "./resources/styles/pages/errors/500.scss",
        "styles/layout/base": "./resources/styles/layout/base.scss",
        "styles/layout/app": "./resources/styles/layout/app.scss",
        "styles/components/global/logo":
            "./resources/styles/components/global/logo.scss",
    },

    copy: [
        {
            from: "./resources/images/cancel.png",
            to: "./images/cancel.[contenthash].png",
        },
    ],

    cacheGroups: {
        vue: {
            test: /[\\/]node_modules[\\/]vue/i,
            name: "chunks/vue",
            chunks: "all",
            priority: 100,
        },

        buefy: {
            test: /[\\/]node_modules[\\/]buefy/i,
            name: "chunks/buefy",
            chunks: "all",
            priority: 100,
        },

        validatorjs: {
            test: /[\\/]node_modules[\\/]validatorjs/i,
            name: "chunks/validatorjs",
            chunks: "all",
            priority: 100,
        },

        axios: {
            test: /[\\/]node_modules[\\/]axios/i,
            name: "chunks/axios",
            chunks: "all",
            priority: 100,
        },
    },
};
