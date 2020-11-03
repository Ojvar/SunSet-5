export default {
  driver: process.env["DB_DRIVER"] || "NONE",

  user: process.env["DB_USER"],
  pass: process.env["DB_PASS"],
  name: process.env["DB_NAME"],
  host: process.env["DB_HOST"],
  port: process.env["DB_PORT"],

  dbConfig: {
    user: process.env["DB_USER"],
    pass: process.env["DB_PASS"],

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
