const httpServer = require('http-server');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const root = './dist';

console.log('Environment PORT:', process.env.PORT);
console.log('Using port:', port);

const server = httpServer.createServer({
  root: root,
  cache: 3600,
  gzip: true,
  brotli: true,
  cors: true,
  
  // This handles the SPA routing
  before: [
    (req, res) => {
      // If requesting a file that doesn't exist, serve index.html
      const filePath = path.join(root, req.url);
      
      // Check if it's a file request (has extension) or route request
      if (!path.extname(req.url) && !fs.existsSync(filePath)) {
        req.url = '/index.html';
      }
    }
  ]
});

server.listen(port, '0.0.0.0', () => {
  console.log(`✓ Server running on http://0.0.0.0:${port}`);
  console.log('✓ SPA routing enabled - all routes serve index.html');
  console.log('Ready to accept connections');
});