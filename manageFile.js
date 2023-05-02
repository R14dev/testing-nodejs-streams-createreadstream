import fs, { createReadStream } from "fs";
import path from "path";
import Header from "./Header.js";
import { access } from "fs";
const pages = path.resolve(process.cwd() + "/page/");

export async function getContententPage(res, page, params = null) {
  try {
    const stream = getFileContent(page);
    stream.then((data) => {
      data.on("data", (chuncked) => {
        res.setHeader("Cache-Control", Header.cache);
        res.setHeader("Content-Type", Header.ContentType.html);
        res.writeHead(200, { "Content-Type": Header.ContentType.html });
        res.write(chuncked);
        res.end();
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getFileContent(path) {
  try {
    access(`${pages}/${path}.html`, fs.constants.F_OK, (err) => {
      if (err) throw new Error(err);
    });
    const stream = createReadStream(`${pages}/${path}.html`, "utf8");
    return stream;
  } catch (error) {
    console.log(error.message);
  }
}
export function notFounPage(res) {
  try {
    const stream = getFileContent("404");

    stream.then((data) => {
      data.on("data", (chuncked) => {
        res.setHeader("Cache-Control", Header.cache);
        res.setHeader("Content-Type", Header.ContentType.html);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(chuncked);
        res.end();
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}
