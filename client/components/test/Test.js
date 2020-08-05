import React from 'react';
import { PropTypes } from 'prop-types';

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

const Test = ({ test }) => (
    <div className={`test ${getColorClass(test)}`}>
        <h5>{test.title}</h5>
        <h5>{test.duration}ms</h5>
    </div>
);
Test.propTypes = {
    test: PropTypes.shapeOf({
        title: PropTypes.string,
        duration: PropTypes.number
    })
};

export default Test;
