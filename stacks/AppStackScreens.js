import React, {useState, useContext, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {UserContext} from "../context/UserContext"; 
import {FirebaseContext} from "../context/FirebaseContext";
import AuthStackScreens from "./AuthStackScreens"
import MainStackScreens from "./MainStackScreens";
import LoadingScreen from "../screens/LoadingScreen"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';


export default AppStackScreen = () => {

    const AppStack = createStackNavigator()
    const [User, setUser] = useContext(UserContext); 
    const firebase = useContext(FirebaseContext); 


    return(

            <AppStack.Navigator header="none">
                {User.isLoggedIn === true? (
                    <AppStack.Screen 
                        name= "Main" 
                        component={MainStackScreens} 
                        options={{headerShown: false}}
                    />
                ) : User.isLoggedIn === null ? (
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