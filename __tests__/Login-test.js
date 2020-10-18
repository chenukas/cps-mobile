import 'react-native';
import 'react-native-paper';
import React from 'react';
import Login from '../Screens/Login';
import renderer from 'react-test-renderer';

test('Main snapShot', () => {
    const snap = renderer.create(
        <Login />
    ).toJSON();
expect(snap).toMatchSnapshot();
    
});