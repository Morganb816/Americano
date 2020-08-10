const expect = require('chai').expect;
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from '../client/components';

enzyme.configure({ adapter: new Adapter() });

describe('Front End Test Suite', () => {
    describe('Components', () => {
        describe('<Header />', () => {
            const wrapper = shallow(<Header />);
            it('Should render an H1 with "Americano" inside', () => {
                expect(wrapper.find('h1').text()).to.equal('Americano');
            });
        });
    });
});