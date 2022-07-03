import Tesseract from "tesseract.js";
import sharp from "sharp";

import { fetch_image } from "./fetch_image";

(async () => {
  const imagePath = await fetch_image();

  const imagePngPath = imagePath.replace(".gif", ".png");
  await sharp(imagePath).toFile(imagePngPath);

  const {
    data: { text },
  } = await Tesseract.recognize(imagePngPath, "eng");
  console.log(`I think the current occupancy is ${text}`);
})();
