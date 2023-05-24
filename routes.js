import { status } from "./constants.js";
import File from "./File.js";

const route = {
  "/home:get": async (request, response) => {
    status(response, 200);
    const getPage = await File.getContent("/home.html");
    response.write(getPage);
    return response.end();
  },
  default: async (request, response) => {
    status(response, 404);
    const page = await File.getContent("/404.html");
    response.write(page);
    return response.end();
  },
};

export default route;
