/*
    Driver: [memory|redis]
*/
export default {
  store: process.env.SESSION_STORE || "memory",
  options: {
    secret: process.env.SESSION_SECRET || "MySecretKey_Sunset-4.2",
    resave: process.env.SESSION_RESAVE || false,
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED || true,
    cookie: {
      maxAge: process.env.SESSION_COOKIE_MAX_AGE || 1000 * 60 * 60 /* 1 Hour */,
      secure: process.env.SESSION_COOKIE_SECURE || true,
    },
  },
};
