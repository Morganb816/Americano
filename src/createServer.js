const http = require('http');
const fs = require('fs');
const path = require('path');

const createServer = () => http.createServer((req, res) => {
    switch (req.url) {
        case '/bundle.js':
            res.setHeader("Content-Type", "text/javascript");
            const bundle = fs.readFileSync(path.resolve(__dirname, "..", "public", "bundle.js"));
            res.write(bundle);
            break;
        case '/bundle.js.map':
            res.setHeader("Content-Type", "text/javascript");
            const bundleMap = fs.readFileSync(path.resolve(__dirname, "..", "public", "bundle.js.map"));
            res.write(bundleMap);
            break;
        default:
            res.setHeader("Content-Type", "text/html");
            const index = fs.readFileSync(path.resolve(__dirname, "..", "public", "index.html"));
            res.write(index);
            break;
    }
    res.statusCode = 200;
    res.end();
});

module.exports = createServer;