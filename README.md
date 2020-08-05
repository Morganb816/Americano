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
2: Create a `.americano` file like so.
```json
{
    "testDir": "/**.test.js", // Glob path to tests.
    "port": 8080 // Desired port to run americano on
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