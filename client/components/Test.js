import React from 'react';

function getColorClass(test) {
    if (test.state === "passed") {
        if (test.duration > 100) {
            return "pass-slow";
        } else {
            return "pass-fast";
        }
    } else {
        return "fail";
    };
};

const Test = ({test}) => (
    <div class={`test ${getColorClass(test)}`}>
        <h5>{test.title}</h5>
        <h5>{test.duration}ms</h5>
    </div>
);

export default Test;