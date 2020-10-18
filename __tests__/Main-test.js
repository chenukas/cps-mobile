import 'react-native';
import 'react-native-paper';
import React from 'react';
import Main from '../Screens/Main';
import renderer from 'react-test-renderer';

test('Main snapShot', () => {
    const snap = renderer.create(
        <Main />
    ).toJSON();
expect(snap).toMatchSnapshot();
    
});

