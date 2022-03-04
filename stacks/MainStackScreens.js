import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Ionicons} from "@expo/vector-icons"
import {GroupScreen, ProfileScreen, SettingScreen } from "../screens"


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

            switch(route.name){
                case "ProfileScreen": 
                    iconName = "ios-person"
                    break; 

                case "GroupScreen": 
                    iconName = "ios-people-sharp"
                    break; 

                case "SettingScreen": 
                    iconName = "ios-settings"
                    break; 

                default: 
                    iconName = "ios-home"
            }
            
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
                name="ProfileScreen" 
                component={ProfileScreen} 
                options={{headerShown: false}}   
            />
            <MainStack.Screen 
                name="GroupScreen" 
                component={GroupScreen} 
                options={{headerShown: false}}   
            />
            <MainStack.Screen 
                name="SettingScreen" 
                component={SettingScreen} 
                options={{headerShown: false}}   
            />
        </MainStack.Navigator>
    )
}