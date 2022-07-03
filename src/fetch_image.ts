import fs from "fs";
import path from "path";
import axios from "axios";

const url = "https://buchung.hsz.rwth-aachen.de/cgi/studio.cgi?size=64";
const referer =
  "https://buchung.hsz.rwth-aachen.de/angebote/aktueller_zeitraum/_Auslastung.html";

async function download(url: string, dest: string) {
  const res = await axios.get(url, {
    responseType: "stream",
    headers: { Referer: referer },
  });

  const fileStream = fs.createWriteStream(dest);
  await new Promise<void>((resolve, reject) => {
    res.data.pipe(fileStream);
    res.data.on("error", (err: any) => reject(err));
    res.data.on("end", () => resolve());
  });
}

export async function fetch_image(): Promise<string> {
  const filePath = path.join(__dirname, "../images/studio.gif");
  download(url, filePath);

  return filePath;
}
