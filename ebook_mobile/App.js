/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Booklist} from './components/Booklist';
import {HomeScreen} from './screen/HomeScreen';
import {SigninScreen} from './screen/SigninScreen';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" component={SigninScreen} options={{headerShown:false}}/>
              <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
  );
};



export default App;
