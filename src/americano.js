#!/usr/bin/env node

const Mocha = require('mocha');
const glob = require('glob');
const watch = require('node-watch');
const createServer = require('./createServer');
const WebSocket = require('ws');
const createReporter = require('./createReporter');
const fs = require('fs');
const { printStartMessage } = require('./util');

// Check if directory has an americano config file.
const hasConfig = fs.existsSync('./.americano');

// If they do not let them know to create one and close the program.
if (!hasConfig) {
    console.log('No config file found. Please create a `.americano` file');
    process.exit();
}

// If the do have a americano config file lets parse its data into JSON.
const config = JSON.parse(fs.readFileSync('./.americano', 'utf8'));

// Latests test results.
let latestResults = null;
// HTTP server instance.
const server = createServer();
// Web Socket Server instance connected to our HTTP server.
const wss = new WebSocket.Server({ server });

// On client connect if we have any results to send, send them.
wss.on('connection', (ws) => {
    if (latestResults !== null) {
        ws.send(latestResults);
    }
});

/*
    The below code does as follows.
    1: starts our http server on port 8080.
    2: retreives and array of all files to watch from glob.
    3: watch's all of those files for changes.
    4: runs our tests for the first time.
    5: if a file changes we run our tests again.
*/
server.listen(config.port || 8080, () => {
    let testFiles;
    let watched = {};

    glob(config.testDir || '*', (evt, files) => {
        testFiles = files;
        files.forEach((file) => {
            watched[file] = true;
            watch(file, () => {
                runTests(files);
            });
        });
        runTests(files);
    });

    glob(config.watchDir, (evt, files) => {
        files.forEach(file => {
            if (!watched[file]) {
                watched[file] = true;
                watch(file, () => {
                    runTests(testFiles);
                });
            }
        });
    });
    printStartMessage();
});

/**
 * Stringify's the given results, stores them localy in memory, and then sends them to all connected clients.
 * @param {Object} results - Result set
 */
function handleResults(results) {
    results = JSON.stringify(results);
    latestResults = results;
    wss.clients.forEach((client) => {
        client.send(results);
    });
}

/**
 * Run Tests
 * - Runs tests for a given array of files.
 * @param {string[]} files - Array of file paths.
 */
function runTests(files) {
    // We need to clear require cache to retest with mocha.
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);
    const mocha = new Mocha();

    config.helpers.forEach(file => mocha.addFile(file));

    files.forEach((file) => {
        mocha.addFile(file);
    });

    mocha.reporter(createReporter(handleResults));
    mocha.run();
}
