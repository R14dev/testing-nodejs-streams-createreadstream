import fs, { createReadStream } from "node:fs";
import path from "node:path";
import Header from "./Header.js";
export default function loadStaticFile(res, url) {
  const paramters = url.split("/");
  const paths = [],
    urls = [];
  for (const key in paramters) {
    if (paramters[key] === null || paramters[key] === "") continue;
    else paths.push(paramters[key]);
  }

  for (var t = 0; t < paths.length; t++) {
    if (paths[t].includes("assets")) {
      if (fs.existsSync(path.resolve(process.cwd() + `/${paths[t]}`))) {
        urls.push(`/${paths[t]}/${paths[1]}/${paths[2]}`);
      }
    }
  }
  try {
    for (const key in urls) {
      const streams = createReadStream(process.cwd() + urls[key]);
      streams.on("data", (chucked) => {
        res.setHeader("Cache-Control", Header.cache);
        res.setHeader(
          "Content-Type",
          urls[key].includes(".js")
            ? Header.ContentType.javascipt
            : Header.ContentType.css
        );
        res.writeHead(200, {
          "Content-Type": urls[key].includes(".js")
            ? Header.ContentType.javascipt
            : Header.ContentType.css,
        });
        res.write(chucked);
        res.end();
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
