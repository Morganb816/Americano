import React, { useEffect, useState } from 'react';
import { Header, Suite } from './components';

/**
 * Process Results
 * - Parses and returns the stringified results passed in.
 * @param {string} results - Stringified test results.
 * @returns {object} - Parsed test results.
 */
const processResults = (results) => {
    const data = JSON.parse(results.data);
    return data;
};

/**
 * Get WS Origin
 * - Returns the ws version of this windows origin. Swaps out http for ws.
 * @returns {string} ws origin url.
 */
const getWsOrigin = () => {
    const origin = window.location.origin.split(':');
    origin[0] = 'ws';
    return origin.join(':');
};

/**
 * App
 * - Main React component containing the rest of our application.
 * @returns {React.ReactElement}
 */
const App = () => {
    // This clients web socket connection.
    const [ws, setWs] = useState(null);
    // Latest received results from server.
    const [results, setResults] = useState({});

    // Runs when the component mounts. Connects to the websocket server and
    // initializes a listener for websocket messages. Finnaly it sets our
    // connection on state.
    useEffect(() => {
        const ws = new WebSocket(getWsOrigin());
        ws.onmessage = (data) => setResults(processResults(data));
        setWs(ws);
    }, []);

    return (
        <div>
            <Header
                totalCount={results?.totals?.overall}
                passCount={results?.totals?.pass}
                failCount={results?.totals?.fail}
                slowCount={results?.totals?.slow}
                time={results?.totals?.time}
            />
            {results.suites &&
                Object.keys(results?.suites).map((suiteTitle, i) => (
                    <Suite
                        key={`suite-${suiteTitle}-${i}`}
                        suite={results.suites[suiteTitle]}
                        title={suiteTitle}
                    />
                ))}
        </div>
    );
};

export default App;
