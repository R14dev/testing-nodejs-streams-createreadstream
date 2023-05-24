import fs, { createReadStream } from "node:fs";
import path from "node:path";
import Header from "./Header.js";
export default function loadStaticFile(res, url) {
  const parameters = url.split("/");
  const paths = [];
  const  urls = [];
  for (const key in parameters) {
    if (parameters[key] === null || parameters[key] === "") continue;
    else paths.push(parameters[key]);
  }

  for (var t = 0; t < paths.length; t++) {
    // join path if inlucde assets 
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
