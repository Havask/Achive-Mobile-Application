import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Ionicons} from "@expo/vector-icons"
import { HomeScreen, GroupScreen, RoutineScreen } from "../screens"


export default MainStackScreens = () => {

    const MainStack = createBottomTabNavigator()

    const screenOptions = (({route}) => ({

        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#222222", 
            paddingBottom: 12,
        },

        tabBarIcon: ({focused}) => {
            let iconName = "ios-home"
            return <Ionicons 
                name={iconName} 
                size={26} 
                color={focused ? "#ffffff" : "#666666"} 
            />;
        },
    }))

    return(
        <MainStack.Navigator screenOptions={screenOptions}>
            <MainStack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{headerShown: false}}   
            />
            <MainStack.Screen 
                name="GroupScreen" 
                component={GroupScreen} 
                options={{headerShown: false}}   
            />
            <MainStack.Screen 
                name="RoutineScreen" 
                component={RoutineScreen} 
                options={{headerShown: false}}   
            />
        </MainStack.Navigator>
    )
}