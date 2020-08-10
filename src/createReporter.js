const { Runner, reporters } = require('mocha');
const { SuiteTree, clean, cleanCycles } = require('./util');
const constants = Runner.constants;

/**
 * Create Reporter
 * - Returns a mocha reporter with access to a callback
 *   we can use to handle the data after the tests finish.
 * @param {function} callback - run when our test finish running. takes in the results from this pass.
 * @returns {function} reporter
 */
function createReporter(callback) {
    return function myReporter(runner) {
        // Inherit mochas Base repoter statistics. Gives us access to things like errors
        reporters.Base.call(this, runner);

        let suiteTree = new SuiteTree('');
        let totalTests = 0;
        let totalPass = 0;
        let totalSlow = 0;
        let totalFail = 0;
        let startTime = 0;

        // RUN BEGIN AND END
        {
            runner.on(constants.EVENT_RUN_BEGIN, () => {
                startTime = Date.now();
            });
            runner.on(constants.EVENT_RUN_END, () => {
                callback({
                    totals: {
                        overall: totalTests,
                        pass: totalPass,
                        fail: totalFail,
                        slow: totalSlow,
                        time: Date.now() - startTime
                    },
                    suites: cleanCycles(suiteTree.branches[''].branches)
                });
            });
        }

        // SUITE BEGIN AND END
        {
            runner.on(constants.EVENT_SUITE_BEGIN, (suite) => {
                suiteTree = suiteTree.addBranch(suite.title);
            });
            runner.on(constants.EVENT_SUITE_END, () => {
                suiteTree.finish();
                suiteTree = suiteTree.parent;
            });
        }

        // TEST FAIL AND PASS
        {
            runner.on(constants.EVENT_TEST_FAIL, (test) => {
                suiteTree.addTest(clean(test));
                totalFail += 1;
                totalTests += 1;
            });
            runner.on(constants.EVENT_TEST_PASS, (test) => {
                suiteTree.addTest(clean(test));
                if (test.duration > 1000) {
                    totalSlow += 1;
                } else {
                    totalPass += 1;
                }
                totalTests += 1;
            });
        }
    };
}

module.exports = createReporter;
