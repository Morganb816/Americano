
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// If we are requiring this file from the main thread.
// return a function that can be used to spawn workers that run our tests.
if (isMainThread) {
    module.exports = function runTests(files) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: files
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', code => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped working with exit code ${code}`));
                }
            });
        });
    };
} else {

    // This peice of code allows us to collect any logs that the user has made from mocha.
    let logs = [];
    console.log = function (log) {
        logs.push(log);
        process.stdout.write(log + '\n');
    };

    // If this file is being read as a worker.
    const Mocha = require('mocha');
    const createReporter = require('./createReporter');

    // Create a new instance of mocha.
    const mocha = new Mocha();

    // For each file input add it to our mocha instance for testing.
    workerData.forEach(file => {
        mocha.addFile(file);
    });

    // Link a new reporter to mocha that passes results back to the parent port when complete.
    mocha.reporter(createReporter(results => {
        parentPort.postMessage(results);
    }, () => {
        let store = logs;
        logs = [];
        return store;
    }));

    // Run Mocha.
    mocha.run();
}