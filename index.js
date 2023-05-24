import http from "http";
import loadStaticFile from "./static.js";
import Route from "./routes.js";

const handler = async (request, response) => {
  const { url, method } = request;
  let chosenRoute = {};
  const route = `${url}:${method}`.toLocaleLowerCase();
  if ("/:get" === route) chosenRoute = Route.default;
  else chosenRoute = Route[route] || Route.notFound;
  loadStaticFile(response, url);
  return chosenRoute(request, response);
};
const server = http.createServer(handler);

server.listen(5000, () => {
  console.log(`server running at port:${5000}`);
});
