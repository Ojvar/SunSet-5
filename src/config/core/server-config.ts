export default {
  envFile: process.env.ENV_FILE || ".env",

  publicFolder: "public",
  routerManifest: "router-manifest.json",
  acceptableTypes: [".ts", ".js"],
};
