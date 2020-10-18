import 'react-native';
import React from 'react';
import Main from '../Screens/Main';
import renderer from 'react-test-renderer';

import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

it('Testing Props', ()=> {
    const wrapper = shallow(<Main data="Hello" />)/props();
    console.warn(wrapper)

    expect(wrapper.children.props.children).toEquals('Hello');
})
