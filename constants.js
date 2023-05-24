export function status(response,code) {
  response.writeHead(code, { "Content-Type": "text/html" });
}
