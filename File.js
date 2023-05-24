import { readFile } from "node:fs/promises";
import path from "node:path";
const pages = path.resolve(process.cwd() + "/page");
class File {
  static async getContent(file) {
    const page = (await readFile(pages + file)).toString();
    return page;
  }
}

export default File;
