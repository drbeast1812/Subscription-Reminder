
const http = require("http");

const PORT = process.env.PORT || 3000;

const manifest = {
  id: "community.nuvio.custommessage",
  version: "1.0.0",
  name: "Custom Message",
  description: "Displays a custom message in Nuvio",
  resources: ["stream"],
  types: ["movie", "series"],
  catalogs: []
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const path = new URL(req.url, "http://localhost").pathname;

  if (path === "/") {
    res.writeHead(200);
    return res.end(JSON.stringify({
      message: "Custom Message addon is running"
    }));
  }

  if (path === "/manifest.json") {
    res.writeHead(200);
    return res.end(JSON.stringify(manifest));
  }

  if (/^\/stream\/(movie|series)\/.+\.json$/.test(path)) {
    res.writeHead(200);
    return res.end(JSON.stringify({
      streams: [
        {
          title: "✨ Enjoy watching! Thanks for using my addon."
        }
      ]
    }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Addon running on port ${PORT}`);
});
