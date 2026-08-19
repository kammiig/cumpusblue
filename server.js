// Passenger (cPanel "Setup Node.js App") startup file.
// Passenger cannot invoke `next start`; it needs a script that creates the
// server itself and listens on the port it injects via process.env.PORT.
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
});
