/*
    Driver: [memory|redis]
*/
export default {
  store: process.env.SESSION_STORE || "memory",
  options: {
    name: process.env.SESSION_NAME || "session",
    secret: process.env.SESSION_SECRET || "MySecretKey_Sunset-4.2",
    resave: process.env.SESSION_RESAVE || false,
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED || true,
    cookie: {
      maxAge: process.env.SESSION_MAX_AGE || 1000 * 60 * 60 /* 1 Hour */,
      path: process.env.SESSION_PATH || "/",
      httpOnly: process.env.SESSION_HTTP_ONLY || true,
      sameSite: process.env.SESSION_SAME_SITE || "strict",
      secure:
        process.env.SESSION_COOKIE_SECURE || process.env.PROTOCOL == "https",
    },
  },
};
