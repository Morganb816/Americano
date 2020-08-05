import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Get Color Class.
 * Returns the class name of a result color for a given test.
 * @param {object} test - test to get color for
 */
function getColorClass(test) {
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
 * Test
 * - React component that renders a tests title and duration
 */
const Test = ({ test }) => (
    <div className={`test ${getColorClass(test)}`}>
        <h5>{test.title}</h5>
        <h5>{test.duration}ms</h5>
    </div>
);
Test.propTypes = {
    test: PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.number
    })
};

export default Test;
