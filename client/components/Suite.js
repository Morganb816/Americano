import React from 'react';
import { Test } from './';

const Suite = ({ suite, title, nestLevel = 0 }) => (
    <div className={`suite nest-level-${nestLevel % 3}`}>
        <div className="suite-header">
            <h3>{title}</h3>
            <h5>{`Test Time: ${suite.duration}ms`}</h5>
        </div>
        {suite.tests.map(test =>
            <Test
                test={test}
            />
        )}
        {Object.keys(suite.branches).map(suiteTitle =>
            <Suite
                suite={suite.branches[suiteTitle]}
                title={suiteTitle}
                nestLevel={nestLevel + 1}
            />
        )}
    </div>
)

export default Suite;