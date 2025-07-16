import { Router } from "express";
import { join } from "path";
import { existsSync } from "fs";
import { config } from "../config.js";
import { middleware } from "../middleware.js";
const router = Router();

// Supported extensions & folder path
const supportedExtensions = [".jpeg", ".jpg", ".png", ".webp"];
const imagesFolderPath = config.IMAGES_FOLDER_PATH;
console.log("imagesFolderPath: ", imagesFolderPath);

router.use(middleware);

// GET api to serve images
router.get("/:name", (req, res) => {
  console.log(`Get Request for image: ${req.params.name}`);
  const baseName = req.params.name;

  // Try finding a matching file with any of the supported extensions
  for (const ext of supportedExtensions) {
    const fullPath = join(imagesFolderPath, baseName + ext);
    if (existsSync(fullPath)) {
      return res.sendFile(fullPath);
    }
  }

  res.status(404).send("Image not found");
});

export default router;
