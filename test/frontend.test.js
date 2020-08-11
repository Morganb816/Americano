const expect = require('chai').expect;
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header, StatGroup, StatBar, Test, Error, Suite } from '../client/components';
import { TestError, TestStack } from '../client/components/test/Test';

enzyme.configure({ adapter: new Adapter() });

describe('Front End Test Suite', () => {
    describe('Components', () => {
        describe('<Header />', () => {
            const wrapper = shallow(<Header />);
            it('Should render an H1 with "Americano" inside', () => {
                expect(wrapper.find('h1').text()).to.equal('Americano');
            });
            it('Should render an instance of StatGroup', () => {
                expect(wrapper.find(StatGroup).length).to.equal(1);
            });
        });
        describe('<StatGroup />', () => {

            const stats = [{
                percent: 50,
                amount: 10,
                color: 'red',
                fontColor: 'white'
            }, {
                percent: 50,
                amount: 10,
                color: 'yellow',
                fontColor: 'black'
            }];

            const wrapper = shallow(<StatGroup stats={stats} />);
            it('Should render a collection of stats', () => {
                const statCount = wrapper.find('.stat-group').children().length;
                expect(statCount).to.equal(stats.length);
            });
            it('Should render each stat as a <StatBar />', () => {
                wrapper.find('.stat-group').children().forEach((child, i) => {
                    expect(child.type()).to.equal(StatBar);
                });
            });
            describe('<StatBar />', () => {
                const bar = shallow(<StatBar {...stats[0]} />);
                it('Should render the correct amount in the bar', () => {
                    const number = bar.find('.amount').text();
                    console.log('Number: ', number);
                    expect(Number(number)).to.equal(stats[0].amount);
                });
            });
        });
        describe('<Test />', () => {
            const testData = {
                title: 'test',
                duration: 50,
                err: { actual: 5, expected: 6, stack: 'hello at line1234 hello,js' },
                state: 'failed',
                logs: ['1', '2', '3']
            };

            const test = shallow(<Test test={testData} />);
            const title = test.find('.test-title').text();
            const duration = test.find('.test-duration').text();
            const logs = test.find('.code-block').children();
            const logCount = logs.length - 1;
            const testError = test.find(TestError);
            const testStack = test.find(TestStack);

            it('Should render the title of the test', () => {
                console.log('Test Title: ', title);
                expect(title).to.equal(testData.title);
            });
            it('Should render the duration of the test', () => {
                expect(duration).to.equal(`${testData.duration}ms`);
            });
            it('Should render any logs received from the server', (done) => {
                setTimeout(() => {
                    expect(logCount).to.equal(testData.logs.length);
                    done();
                }, 1300);
            });
            it('Should render a TestError if state is failed', () => {
                expect(testError.length).to.equal(4);
            });
            it('Should render a TestStack if state is failed', () => {
                expect(testStack.length).to.equal(2);
            });
        });
        describe('<Error />', () => {
            const errData = { message: 'test', stack: 'hello \\n hello again' };
            const error = shallow(<Error error={errData} />);
            it('Should render the error message', () => {
                expect(error.find('h3').text()).to.equal('test');
            });
            it('Should render the stack trace', () => {
                expect(error.find('code').children().length).to.equal(2);
            });
        });
    });
});