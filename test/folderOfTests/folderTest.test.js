const expect = require('chai').expect;

function returnsTrue() {
    return true;
}

function sum(a, b) {
    return a + b;
}

describe('Folder Test Suite', () => {
    describe('Should look in folders for tests', () => {
        it('Should accept two numbers as parameters and return the sum', () => {
            expect(sum(1, 1)).to.equal(2);
        });
    });
});