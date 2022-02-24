import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackScreen from "./stacks/AppStackScreens";

import {UserProvider} from "./context/UserContext";
import {FirebaseProvider} from "./context/FirebaseContext";

export default App = () =>{
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
            <AppStackScreen/>
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  )
}
