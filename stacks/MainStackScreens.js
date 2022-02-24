import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Ionicons} from "@expo/vector-icons"

import { HomeScreen } from "../screens"


export default MainStackScreens = () => {

    const MainStack = createBottomTabNavigator()

    const tabBarOptions = {
        showLabel: false, 
        style: {
            backgroundColor: "#222222", 
            paddingBottom: 12,
        }
    }

    const screenOptions = (({route}) => ({
        tabBarIcon: ({focused}) => {
            let iconName = "ios-home"
            return <Ionicons name={iconName} size={24} color={focused ? "#ffffff" : "#666666"} />;
        }
    }))

    return(

        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <MainStack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{headerShown: false}}   
            />
        </MainStack.Navigator>
    )
}