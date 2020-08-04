import React from 'react';

const Stat = ({title, value}) => (
    <div className="stat">
        <h3>{title}: {value}</h3>
    </div>
);

const Header = ({title, passCount, totalCount, failCount, time}) => (
    <header>
        <h3>{title} - Results</h3>
        <div>
            <Stat title="Total" value={totalCount} />
            <Stat title="Passed" value={passCount} />
            <Stat title="Failed" value={failCount} />
            <Stat title="Time" value={`${time}ms`} />
        </div>
    </header>
);

export default Header;