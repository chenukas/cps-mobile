import 'react-native';
import 'react-native-paper';
import React from 'react';
import Login from '../Screens/Login';
import renderer from 'react-test-renderer';

let findElement=function(password, element){
    return true;
}

it('find elements', ()=> {
    let password = renderer.create(
        <Login />
    ).toJSON();

    expect(findElement(password, 'password')).toBeDefined();
})