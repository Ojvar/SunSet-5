const throttleStore: string = process.env.EXPRESS_THROTTLE_STORE || "memory";
const throttleWindow: string = process.env.EXPRESS_THROTTLE_WINDOW || "60000";
const throttleMax: string = process.env.EXPRESS_THROTTLE_MAX || "60";
const throttleDelay: string = process.env.EXPRESS_THROTTLE_DELAY || "0";
const useMulter: boolean = (process.env.USE_MULTER || "true") == "true";

export default {
  publicPath: "dist/public",

  protocol: process.env.PROTOCOL || "http",
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "8585"),
  url: process.env.SERVER_URL || "http://localhost:8585",

  trustedProxy: process.env.TRUSTED_PROXY || "loopback, linklocal, uniquelocal",

  throttleStore,
  throttleWindow: parseInt(throttleWindow),
  throttleMax: parseInt(throttleMax),
  throttleDelay: parseInt(throttleDelay),

  /* Use multer as default */
  useMulter,

  /* SSL file paths */
  sslServerKey: process.env.SSL_KEY || "private/ssl/server-key.pem",
  sslServerCert: process.env.SSL_CERT || "private/ssl/server-cert.pem",
};
