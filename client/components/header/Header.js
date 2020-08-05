import React from 'react';
import PropTypes from 'prop-types';

const StatGroup = ({ stats }) => {
    let highestPercent = 0;

    for (let i = 0; i < stats.length; i++) {
        if (stats[i].percent > highestPercent) {
            highestPercent = stats[i].percent;
        }
    }

    return (
        <div className="stat-group">
            {stats.map((stat, i) => (
                <StatBar
                    key={`stat-${i}`}
                    percent={stat.percent / highestPercent}
                    amount={stat.amount}
                    color={stat.color}
                    fontColor={stat.fontColor}
                />
            ))}
        </div>
    );
};
StatGroup.propTypes = {
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            percent: PropTypes.number,
            amount: PropTypes.number,
            color: PropTypes.string,
            fontColor: PropTypes.string
        })
    )
};

const StatBar = ({ percent, amount, color, fontColor = 'white' }) => (
    <div className="stat-bar">
        <div
            style={{ height: `${percent * 100}%`, backgroundColor: `${color}` }}
        >
            {<h3 style={{ color: fontColor }}>{amount}</h3>}
        </div>
    </div>
);
StatBar.propTypes = {
    percent: PropTypes.number,
    amount: PropTypes.number,
    color: PropTypes.string,
    fontColor: PropTypes.string
};

const Header = ({ passCount, totalCount, failCount, slowCount, time }) => (
    <header>
        <h1 id="title">Americano</h1>
        <StatGroup
            stats={[
                {
                    percent: passCount / totalCount,
                    amount: passCount,
                    color: 'rgb(80, 197, 80)'
                },
                {
                    percent: slowCount / totalCount,
                    amount: slowCount,
                    color: 'rgb(255, 230, 0)',
                    fontColor: 'rgb(83, 83, 83)'
                },
                {
                    percent: failCount / totalCount,
                    amount: failCount,
                    color: 'rgb(206, 72, 72)'
                }
            ]}
        />
    </header>
);
Header.propTypes = {
    passCount: PropTypes.number,
    totalCount: PropTypes.number,
    failCount: PropTypes.number,
    slowCount: PropTypes.number,
    time: PropTypes.number
};

export default Header;
