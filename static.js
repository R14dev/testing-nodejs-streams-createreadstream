import { stat } from "node:fs/promises";
import path from "node:path";
import Header from "./Header.js";
import { createReadStream } from "node:fs";
export default async function loadStaticFile(res, url) {
  if ("/" != url) {
    if (url.includes("assets")) {
      if (stat(path.resolve(process.cwd() + `${url}`))) {
        const getContent = createReadStream(
          path.resolve(process.cwd() + `${url}`)
        );
        getContent.on("data", (chunked) => {
          res.writeHead(200, {
            "Content-Type": url.includes(".js")
              ? Header.ContentType.javascipt
              : Header.ContentType.css,
          });
          res.write(chunked);
          res.end();
        });
      }
    }
  }
}
