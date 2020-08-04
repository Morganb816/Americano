const expect = require('chai').expect;

function returnsTrue() {
    return true;
}

function sum(a, b) {
    return a + b;
}

describe('Demo Test Suite', () => {
    describe('Sum Function', () => {
        it('Should accept two numbers as parameters and return the sum', () => {
            expect(sum(1, 1)).to.equal(2);
        });
        it('Should work - Fake Fail', () => {
            expect(sum(1, 1)).to.equal(3);
        });
    });
    describe('Returns True', () => {
        it('Should return true - Fake Slow', done => {
            expect(returnsTrue()).to.be.true;
            setTimeout(() => {
                done();
            }, 1000);
        });
        it('Should NOT return false', () => {
            expect(returnsTrue()).to.not.be.false;
        });
        describe('Sum Function', () => {
            it('Should accept two numbers as parameters and return the sum', () => {
                expect(sum(1, 1)).to.equal(2);
            });
            it('Should work - Fake Fail', () => {
                expect(sum(1, 1)).to.equal(3);
            });
        });
    });
});