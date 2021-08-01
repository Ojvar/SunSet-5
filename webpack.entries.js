module.exports = {
    files: {
        /* Scripts */
        "scripts/pages/home/index": "./resources/scripts/pages/home/index.ts",
        "scripts/pages/auth/about": "./resources/scripts/pages/home/about.tsx",
        "scripts/pages/auth/login": "./resources/scripts/pages/auth/login.ts",
        "scripts/pages/errors/500": "./resources/scripts/pages/errors/500.ts",

        /* Styles */
        "styles/pages/errors/500": "./resources/styles/pages/errors/500.scss",
        "styles/layout/base": "./resources/styles/layout/base.scss",
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

        react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/i,
            name: "chunks/react",
            chunks: "all",
            priority: 100,
        },

        bulma: {
            test: /[\\/]node_modules[\\/]bulma/i,
            name: "chunks/bulma",
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
