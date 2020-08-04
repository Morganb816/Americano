const Mocha = require('mocha');
const glob = require('glob');
const watch = require('node-watch');
const createServer = require('./createServer');
const WebSocket = require('ws');
const createReporter = require('./createReporter');

let latestResults = null;
const server = createServer();
const wss = new WebSocket.Server({ server });

// On client connect if we have any results to send, send them.
wss.on('connection', ws => {
    if (latestResults !== null) {
        ws.send(latestResults);
    }
});

/**
 * Stringify's the given results, stores them localy in memory, and then sends them to all connected clients.
 * @param {Object} results - Result set
 */
function handleResults(results) {
    results = JSON.stringify(results);
    latestResults = results;
    wss.clients.forEach(client => {
        client.send(results);
    });
};

/**
 * Run Tests
 * - Runs tests for a given array of files.
 * @param {string[]} files - Array of file paths.
 */
function runTests(files) {
    // We need to clear require cache to retest with mocha.
    Object.keys(require.cache).forEach(key => delete require.cache[key]);
    const mocha = new Mocha();

    files.forEach(file => {
        mocha.addFile(file);
    });

    mocha.reporter(createReporter(handleResults));
    mocha.run();
}

/*
    The below code does as follows.
    1: starts our http server on port 8080.
    2: retreives and array of all files to watch from glob.
    3: watch's all of those files for changes.
    4: runs our tests for the first time.
    5: if a file changes we run our tests again.
*/
server.listen(process.argv[3] || 8080, () => {
    glob(process.argv[2], (evt, files) => {
        files.forEach(file => {
            watch(file, () => {
                runTests(files);
            });
        });
        runTests(files);
    });
});


