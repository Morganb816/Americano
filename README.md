# Americano
## About
Americano is a live HTML reporter for unit tests written for [MochaJS](https://mochajs.org/).

[NPM](https://www.npmjs.com/package/americano-js)

![Americano Image](https://i.imgur.com/4Yc1FZk.png)

## Motivation
I noticed there was a hole in the Mocha ecosystem that has a few rickity bridges crossing it but nothing stable and reliable. Mocha lacks a stable, nicely packaged, easy to use, solution to HTML live reloading. Americano aims to provide a lightweight solution to this problem.

## Features
* Live Reload 🥳
* Generate HTML Reports
* No new API's to learn

## Usage

1: Install 
```
npm install americano-js --save-dev
```
2: Run americano for the first time. It will give you a series of prompts to create a config file that looks something like the example below.
```js
{
    // Directory containing test files.
    "testDir": "test/**/*.js",
    // Directory of files to watch for changes.
    "watchDir": "public/*", 
    // Directory of files to ignore changes in (Optional)
    "ignoreDir": "node_modules/*", 
    // Helper files for your mocha tets. Such as @babel-register or setting up JSDOM.
    "helpers": [ 
        "test/helper.js"
    ],
    // Port you would like the test server to host results at. (defaults to 8080)
    "port": 8080
}
```
3: Run `americano`/add it as your test program
```
...
"scripts": {
    "test": "americano"
}
...
```