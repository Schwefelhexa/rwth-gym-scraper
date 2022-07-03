import { fetch_image } from "./fetch_image";

(async () => {
  const path = await fetch_image();
  console.log(`Saved image to ${path}`);
})();
