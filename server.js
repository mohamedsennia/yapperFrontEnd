const httpServer = require('http-server');

const port = process.env.PORT || 8080;
const server = httpServer.createServer({
  root: './dist',
  cache: 3600,
  gzip: true,
  brotli: true
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});