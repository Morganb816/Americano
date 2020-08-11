import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Get Color Class.
 * Returns the class name of a result color for a given test.
 * @param {object} test - test to get color for
 * @exports
 */
export function getColorClass(test) {
    if (test.state === 'passed') {
        if (test.duration > 100) {
            return 'pass-slow';
        } else {
            return 'pass-fast';
        }
    } else {
        return 'fail';
    }
}

/**
 * Test Error
 * - React component that renders mocha test errors as code blocks like they would show in the console.
 */
export const TestError = ({ err }) => (
    <div className='code-block'>
        <code>
            <span className='red'>- expected</span>  <span className='gray'>+ actual</span><br />
            <br />
            <span className='red'>- {err.actual}</span><br />
            <span className='gray'>+ {err.expected}</span>
        </code>
    </div>
);
TestError.propTypes = {
    err: PropTypes.shape({
        actual: PropTypes.any,
        expected: PropTypes.any
    })
};

/**
 * Test Stack
 * - React Component that renders mocha test stacks as code blocks like they would show in the console.
 */
export const TestStack = ({ stack }) => (
    <div className='code-block'><code>{stack.split('at ').map((line, i) =>
        i === 0
            ? line
            : (
                <React.Fragment>
                    <br /><span style={{ marginLeft: '25px' }}>at ${line}</span>
                </React.Fragment>
            )
    )
    }</code></div>
);
TestStack.propTypes = {
    stack: PropTypes.string
};

/**
 * Test
 * - React component that renders a tests title and duration
 */
export const Test = ({ test }) => (
    <div className={`test ${getColorClass(test)}`}>
        <div>
            <h5 className='test-title'>{test.title}</h5>
            <h5 className='test-duration'>{test.duration}ms</h5>
        </div>
        {test.state === 'failed' && (
            <React.Fragment>
                <TestError err={test.err} />
                <TestStack stack={test.err.stack} />
            </React.Fragment>
        )}
        {test.logs.length > 0 && (
            <div className='code-block'>Logs: {
                test.logs.map((log, i) => (
                    <code key={`log-${i}-${log}`}>
                        <br /><span style={{ marginLeft: '15px' }}>{log}</span>
                    </code>
                ))
            }</div>
        )}
    </div>
);
Test.propTypes = {
    test: PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.number,
        err: PropTypes.object,
        state: PropTypes.string,
        logs: PropTypes.array
    })
};

export default Test;
