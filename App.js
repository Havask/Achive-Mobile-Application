import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {HomeScreen, LogInScreen, ToDo, SignIn} from "./screens";


import Colors from "./constants/colors";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
              name = "LogInScreen"
              component={LogInScreen}
            />
      <Stack.Screen
              name = "HomeScreen"
              component={HomeScreen}
            />
      <Stack.Screen
              name = "SignIn"
              component={SignIn}
            />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
