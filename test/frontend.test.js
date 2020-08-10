const expect = require('chai').expect;
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header, StatGroup, StatBar } from '../client/components';

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
                console.log('Test Comment - ' + statCount);
                expect(statCount).to.equal(stats.length);
            });
            it('Should render each stat as a <StatBar />', () => {
                wrapper.find('.stat-group').children().forEach((child, i) => {
                    expect(child.type()).to.equal(StatBar);
                });
            });
        });
    });
});