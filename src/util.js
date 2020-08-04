/**
 * Transform an Error object into a JSON object.
 *
 * @private
 * @param {Error} err
 * @return {Object}
 */
function errorJSON(err) {
    var res = {};
    Object.getOwnPropertyNames(err).forEach(function (key) {
        res[key] = err[key];
    }, err);
    return res;
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @private
 * @param {Object} test
 * @return {Object}
 */
function clean(test) {
    var err = test.err || {};
    if (err instanceof Error) {
        err = errorJSON(err);
    }
    return {
        title: test.title,
        fullTitle: test.fullTitle(),
        file: test.file,
        duration: test.duration,
        currentRetry: test.currentRetry(),
        state: test.state,
        err: cleanCycles(err)
    };
}

/**
 * Replaces any circular references inside `obj` with '[object Object]'
 *
 * @private
 * @param {Object} obj
 * @return {Object}
 */
function cleanCycles(obj) {
    var cache = [];
    return JSON.parse(
        JSON.stringify(obj, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return '' + value;
                }
                cache.push(value);
            }
            return value;
        })
    );
}

class SuiteTree {
    constructor(title, parent = null) {
        this.parent = parent;
        this.tests = [];
        this.branches = {};
        this.duration = Date.now();
    }
    addTest(test) {
        this.tests.push(test);
    }
    addBranch(title) {
        const branch = new SuiteTree(title, this);
        this.branches[title] = branch;
        return branch;
    }
    finish() {
        this.duration = Date.now() - this.duration
    }
}

/**
 * Print Start Message
 * - Only used to console log a nice greeting message with a link to the hosted reporter.
 * @param {number} port - Port the server is listening on.
 */
function printStartMessage(port = 8080) {
    console.log(`==============================================================
    Americano Test Server running at http://localhost:${port}
                        Happy Testing!
==============================================================`)
}

module.exports = {
    SuiteTree,
    clean,
    cleanCycles,
    errorJSON,
    printStartMessage
}