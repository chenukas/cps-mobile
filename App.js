import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './Screens/Login';
import Main from './Screens/Main';
import CreateRequisition from './Screens/CreateRequisition';
import ViewRequisition from './Screens/ViewRequisition';
import ViewStocks from './Screens/ViewStocks';
import ViewOrder from './Screens/ViewOrder';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
           name="Login"
           component={Login}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name="Main"
           component={Main}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name="CreateRequisition"
           component={CreateRequisition}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name="ViewRequisition"
           component={ViewRequisition}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name="ViewStocks"
           component={ViewStocks}
           options={{
            headerShown: false
          }}
          />
          <Stack.Screen
           name="ViewOrder"
           component={ViewOrder}
           options={{
            headerShown: false
          }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
