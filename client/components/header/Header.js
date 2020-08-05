import React from 'react';
import PropTypes from 'prop-types';
import { StatGroup } from '../';

/**
 * Header
 * - Header for our application. Renders our logo and a stat group
 * containing totals for the latest results.
 */
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
