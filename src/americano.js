#!/usr/bin/env node
const { printStartMessage, queFunction, loadConfig } = require('./util');
const createServer = require('./createServer');
const runTestsWorker = require('./runTests');
const WebSocket = require('ws');
const glob = require('glob');
const fs = require('fs');

(async () => {


    // Load config data from file.
    const config = await loadConfig();
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
        const testRunner = queFunction(runTests, 500);
        glob(config.testDir || '*', (evt, files) => {
            testFiles = files;
            files.forEach((file) => {
                watched[file] = true;
                fs.watch(file, () => {
                    testRunner(files);
                });
            });
            testRunner(files);
        });

        glob(config.watchDir, (evt, files) => {
            files.forEach(file => {
                if (!watched[file]) {
                    watched[file] = true;
                    fs.watch(file, () => {
                        testRunner(testFiles);
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
     * - Runs our test workers with a given array of files. Pass results to handle results.
     * @param {string[]} files - Array of file paths.
     */
    async function runTests(files) {
        try {
            const results = await runTestsWorker([...config.helpers || [], ...files]);
            handleResults(results);
        } catch (err) {
            console.log(err);
        }
    }


})();