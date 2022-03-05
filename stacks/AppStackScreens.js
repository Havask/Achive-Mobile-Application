import React, {useState, createContext} from "react"; 
import { createStackNavigator } from "@react-navigation/stack";
import {UserContext} from "../context/UserContext"; 
import { useContext } from "react";

import AuthStackScreens from "./AuthStackScreens"
import MainStackScreens from "./MainStackScreens";
import LoadingScreen from "../screens/LoadingScreen"; 

import { NavigationContainer } from '@react-navigation/native';


export default AppStackScreen = () => {

    const AppStack = createStackNavigator()
    const [user] = useContext(UserContext);

    return(

            <AppStack.Navigator header="none">
                {user.isLoggedIn === true? (
                    <AppStack.Screen 
                        name= "Main" 
                        component={MainStackScreens} 
                        options={{headerShown: false}}
                    />
                ) : user.isLoggedIn === null ? (
                    <AppStack.Screen 
                        name = "Auth" 
                        component={AuthStackScreens} 
                        options={{headerShown: false}}
                    />
                ) : (
                    <AppStack.Screen 
                        name= "Loading" 
                        component={LoadingScreen} 
                        options={{headerShown: false}}
                    />
                )}
            </AppStack.Navigator>
    ); 
}