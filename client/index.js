import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';

import './index.scss';

const app = document.getElementById('app');
ReactDOM.render(
    <App />,
    app
);

// const ws = new WebSocket("ws://localhost:8080");

// const totalEl = createStat(document.getElementById('total-stat'));
// const passedEl = createStat(document.getElementById('passed-stat'));
// const failedEl = createStat(document.getElementById('failed-stat'));
// const resultContainer = document.getElementById('result-container');

// function createStat(el) {
//     el.update = function(val) {
//         el.children[1].innerText = val;
//     }
//     return el;
// }

// function createResult(result) {
//     const template = document.createElement('template');
//     html = `<div class="result ${result.state}">
//             <h3>Title: ${result.title}</h3>
//             <div><p>Duration: ${result.duration}ms</p></div></div>`;
//     template.innerHTML = html;
//     return template.content.firstChild;
// }

// function processResults(results) {
//     totalEl.update(results.passed.length + results.failed.length);
//     passedEl.update(results.passed.length);
//     failedEl.update(results.failed.length);
//     while(resultContainer.children.length > 0) {
//         resultContainer.removeChild(resultContainer.firstChild);
//     }
//     results.passed.forEach(result => {
//         resultContainer.appendChild(createResult(result));
//     });
//     results.failed.forEach(result => {
//         resultContainer.appendChild(createResult(result));
//     });
// }

// ws.onmessage = function (event) {
//     processResults(JSON.parse(event.data)); 
// }