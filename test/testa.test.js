const expect = require('chai').expect;

function returnsTrue() {
    return true;
}

function sum(a, b) {
    return a + b;
}

describe('Level 1', () => {
    it('Should work', () => {
        expect(true).to.be.true;
    });
    describe('Level 2 - A', () => {
        it('Should accept two numbers as parameters and return the sum', () => {
            expect(sum(1, 1)).to.equal(3);
        });
        it('Should work - Fake Fail', () => {
            expect(sum(1, 1)).to.equal(3);
        });
    });
    describe('Level 2 - B', () => {
        it('Should return true - Fake Slow', (done) => {
            expect(returnsTrue()).to.be.true;
            setTimeout(() => {
                done();
            }, 1000);
        });
        it('Should NOT return false', () => {
            expect(returnsTrue()).to.not.be.false;
        });
        describe('Level 3 - A', () => {
            it('Should accept two numbers as parameters and return the sum', () => {
                expect(sum(1, 1)).to.equal(2);
            });
            it('Should work - Fake Fail', () => {
                expect(sum(1, 1)).to.equal(2);
            });
        });
    });
});
