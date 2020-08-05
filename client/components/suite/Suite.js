import React from 'react';
import { Test } from '../';
import { PropTypes } from 'prop-types';

/**
 * Suite
 * - Component used to render a test suite, its tests, and any children suites it may have.
 */
const Suite = ({ suite, title, nestLevel = 0 }) => (
    <div className={`suite nest-level-${nestLevel % 3}`}>
        <div className="suite-header">
            <h3 className="suite-title">{title}</h3>
            {suite.tests.length > 0 && (
                <h5>{`Suite Run Time: ${suite.duration}ms`}</h5>
            )}
        </div>
        {suite.tests.map((test, i) => (
            <Test key={`test-${i}`} test={test} />
        ))}
        {Object.keys(suite.branches).map((suiteTitle, i) => (
            <Suite
                key={`suite-${suiteTitle}-${i}`}
                suite={suite.branches[suiteTitle]}
                title={suiteTitle}
                nestLevel={nestLevel + 1}
            />
        ))}
    </div>
);
Suite.propTypes = {
    suite: PropTypes.shape({
        tests: PropTypes.arrayOf(PropTypes.object),
        branches: PropTypes.objectOf(PropTypes.object),
        duration: PropTypes.number
    }),
    title: PropTypes.string,
    nestLevel: PropTypes.number
};

export default Suite;
