const expect = require('chai').expect;
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header, StatGroup } from '../client/components';

enzyme.configure({ adapter: new Adapter() });
describe('yeet', () => {
    it('should be true', () => {
        expect(true).to.be.true;
    });
});
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
    });
});