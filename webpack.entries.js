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
};
