/**
 * Helmet config
 */
export default {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [
                "'self'",
                "data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval' 'unsafe-dynamic'",
            ],
            scriptSrc: [
                "'self'",
                "data: blob: 'unsafe-inline' 'unsafe-eval'",
                // "https://unpkg.com", /* Use any external url you used in your site */
            ],
            connectSrc: ["'self'", "data: blob: 'unsafe-inline'"],
            imgSrc: ["*", "'self'", "data: blob: 'unsafe-inline'"],
            frameSrc: ["'self'", " data: blob:"],
            styleSrc: ["*", "'self'", "data: blob: 'unsafe-inline'"],
            fontSrc: ["*", "'self'", "data: blob: 'unsafe-inline'"],

            // upgradeInsecureRequests: ["'self'"],
        },
        //  reportOnly: true,
        // setAllHeaders: true,
    },

    dnsPrefetchControl: {},

    expectCt: {},

    frameguard: {},

    hidePoweredBy: {},

    hsts: {},

    ieNoOpen: {},

    noSniff: {},

    permittedCrossDomainPolicies: {},

    referrerPolicy: {
        policy: "no-referrer",
    },

    xssFilter: {},
};
