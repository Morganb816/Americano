const http = require('http');
const fs = require('fs');

const createServer = () => http.createServer((req, res) => {
    switch (req.url) {
        case '/bundle.js':
            res.setHeader("Content-Type", "text/javascript");
            const bundle = fs.readFileSync("./public/bundle.js");
            res.write(bundle);
            break;
        case '/bundle.js.map':
            res.setHeader("Content-Type", "text/javascript");
            const bundleMap = fs.readFileSync("./public/bundle.js.map");
            res.write(bundleMap);
            break;
        case '/main.css':
            res.setHeader("Content-Type", "text/css");
            const main = fs.readFileSync("./public/main.css");
            res.write(main);
            break;
        default:
            res.setHeader("Content-Type", "text/html");
            const index = fs.readFileSync("./public/index.html");
            res.write(index);
            break;
    }
    res.statusCode = 200;
    res.end();
});

module.exports = createServer;