import React, { useEffect, useState } from 'react';
import { Header, Suite } from './components';

const processResults = results => {
    const data = JSON.parse(results.data);
    return data
}

const getWsOrigin = () => {
    const origin = window.location.origin.split(":");
    origin[0] = "ws";
    return origin.join(":");
}

const App = props => {
    const [ws, setWs] = useState(null);
    const [results, setResults] = useState({});

    useEffect(() => {
        const ws = new WebSocket(getWsOrigin());
        ws.onmessage = data => setResults(processResults(data));
        setWs(ws);
    }, []);

    return (
        <div>
            <Header
                title="Americano"
                totalCount={results?.totals?.overall}
                passCount={results?.totals?.pass}
                failCount={results?.totals?.fail}
                time={results?.totals?.time}
            />
            {
                results.suites && Object.keys(results?.suites).map(suiteTitle => (
                    <Suite suite={results.suites[suiteTitle]} title={suiteTitle} />
                ))
            }
        </div>
    )
}

export default App;