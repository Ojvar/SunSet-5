/**
 * Multer configs
 */
export default {
  storage: process.env.UPLOAD_STORAGE || "storage/uploads",
  maxSize: process.env.UPLOAD_MAX_SIZE
    ? parseInt(process.env.UPLOAD_MAX_SIZE)
    : 8 * 1024 * 1024 * 1, // 1 MB
};
