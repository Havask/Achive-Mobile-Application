import React, {useState, useContext, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {UserContext} from "../context/UserContext"; 
import {FirebaseContext} from "../context/FirebaseContext";
import AuthStackScreens from "./AuthStackScreens"
import MainStackScreens from "./MainStackScreens";
import LoadingScreen from "../screens/LoadingScreen"; 



export default AppStackScreen = () => {

    const AppStack = createStackNavigator()
    const [User, setUser] = useContext(UserContext); 



    return(

            <AppStack.Navigator header="none">
                {User.isLoggedIn === true? (
                    <AppStack.Screen 
                        name= "Main" 
                        component={MainStackScreens} 
                        options={{headerShown: false}}
                    />
                ) : User.isLoggedIn === false ? (
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