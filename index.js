import http from "http";
import loadStaticFile from "./static.js";
import Route from "./routes.js";

const handler = async (request, response) => {
  const { url, method } = request;
  const route = `${url}:${method}`.toLocaleLowerCase();
  const chosenRoute = Route[route] || Route.default;
  loadStaticFile(response, url);
  return chosenRoute(request, response);
};
const server = http.createServer(handler);

server.listen(5000, () => {
  console.log(`server running at port:${5000}`);
});
