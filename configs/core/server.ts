import { ExpressConfigType } from "core/helpers/express-helper";

export default {
    proto: process.env.PROTO || "http",
    serverUrl: process.env.URL || "http://localhost:8585",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT || "8585"),
} as ExpressConfigType;
