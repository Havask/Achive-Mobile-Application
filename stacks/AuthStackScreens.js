import React, {useState, useContext, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {LogInScreen, SignUpScreen} from "../screens/AuthScreen";



export default AuthStackScreens = () => {

    const AuthStack = createStackNavigator()

    return(
        <AuthStack.Navigator header="none">
            <AuthStack.Screen 
                name = "LogInScreen" 
                component={LogInScreen} 
                options={{headerShown: false}}/>
            <AuthStack.Screen 
                name = "SignUpScreen" 
                component={SignUpScreen} 
                options={{headerShown: false}}/>
        </AuthStack.Navigator>
    ); 
}