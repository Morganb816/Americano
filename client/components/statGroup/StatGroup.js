import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Stat Group
 * - Component used for rendering "stats" as vertical bars.
 */
const StatGroup = ({ stats = [] }) => {
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

/**
 * Stat Bar
 * - Component used in Stat Group to render a single stat bar.
 */
export const StatBar = ({ percent, amount, color, fontColor = 'white' }) => (
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

export default StatGroup;
