import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackScreen from "./stacks/AppStackScreens";

import {UserProvider} from "./context/UserContext";
import {FirebaseProvider} from "./context/FirebaseContext";
import { LocalStorageContext } from "./context/LocalStorageContext";

export default App = () =>{
  return (
    <FirebaseProvider>
      <LocalStorageContext>
        <UserProvider>
          <NavigationContainer>
              <AppStackScreen/>
          </NavigationContainer>
        </UserProvider>
      </LocalStorageContext>
    </FirebaseProvider>
  )
}
