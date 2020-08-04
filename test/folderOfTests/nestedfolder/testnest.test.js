const expect = require('chai').expect;

function returnsTrue() {
    return true;
}

function sum(a, b) {
    return a + b;
}

describe('NEST TEST', () => {
    describe('Should accept nested folders with glob', () => {
        it('Should accept two numbers as parameters and return the sum', () => {
            expect(sum(1, 1)).to.equal(2);
        });
    });
});