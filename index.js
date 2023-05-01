import http from "http";
import routes from "./routes.js";
import { getContententPage, notFounPage } from "./manageFile.js";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let path = null;

  if (method == "GET") {
    if (url === "/") return getContententPage(res, "home");

    if (url.includes("?")) {
      // transform url to array , and get paramters by query
    } else {
      // transform url to array , and get paramters by route parameter
      path = url.split("/");

    }
    const findRoute = routes.find((r) => r === path[1]);
    if (findRoute) {
      return getContententPage(res, findRoute);
    } else {
      return notFounPage(res);
    }
  }
});

server.listen(5000, () => {
  console.log(`server running at port:${5000}`);
});
