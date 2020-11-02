export default {
  envFile: process.env.ENV_FILE || ".env",

  publicFolder: "dist/public",
  routerManifest: "dist/public/router-manifest.json",
  acceptableTypes: [".ts", ".js"],
};
