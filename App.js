import React, {useState, useContext, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackScreen from "./stacks/AppStackScreens";

import {UserProvider} from "./context/UserContext";
import {FirebaseProvider} from "./context/FirebaseContext";
import { NativeBaseProvider} from 'native-base';

export default App = () =>{


  return (
    <NativeBaseProvider>
      <FirebaseProvider>
          <UserProvider>
            <NavigationContainer>
                <AppStackScreen/>
            </NavigationContainer>
          </UserProvider>
      </FirebaseProvider>
    </NativeBaseProvider>
  )
}
