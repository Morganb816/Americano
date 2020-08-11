import React, { useState } from 'react';
import { Test } from '../';
import { PropTypes } from 'prop-types';

/**
 * Suite
 * - Component used to render a test suite, its tests, and any children suites it may have.
 */
const Suite = ({ suite, title, nestLevel = 0 }) => {

    const [open, setOpen] = useState(true);

    const handleClick = () => setOpen(!open);

    return (
        <div className={`suite nest-level-${nestLevel % 3}`}>
            <div className="suite-header" onClick={handleClick}>
                <h3 className="suite-title">{title}</h3>
                {suite.tests.length > 0 && (
                    <h5>{`Suite Run Time: ${suite.duration}ms`}</h5>
                )}
            </div>
            {open && (
                <React.Fragment>
                    {
                        suite.tests.map((test, i) => (
                            <Test key={`test-${i}`} test={test} />
                        ))
                    }
                    {Object.keys(suite.branches).map((suiteTitle, i) => (
                        <Suite
                            key={`suite-${suiteTitle}-${i}`}
                            suite={suite.branches[suiteTitle]}
                            title={suiteTitle}
                            nestLevel={nestLevel + 1}
                        />
                    ))}
                </React.Fragment>
            )}
        </div>
    );
};
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
