import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons"
import {GroupScreen, ProfileScreen, SettingScreen, CreateGroupScreen } from "../screens"

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GroupStack = createNativeStackNavigator();
    
function GroupStackScreen() {
    return (
        <GroupStack.Navigator>
            <GroupStack.Screen name="Groups" component={GroupScreen} options={{headerShown: false}}/>
            <GroupStack.Screen name="CreateGroup" component={CreateGroupScreen} options={{headerShown: false}}/>
        </GroupStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen(){
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
        </ProfileStack.Navigator>
    );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingScreen} options={{headerShown: false}} />
        </SettingsStack.Navigator>
    );
}

export default MainStackScreens = () => {

    const screenOptions = (({route}) => ({

        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#222222", 
            paddingBottom: 12,
        },
        
        tabBarIcon: ({focused}) => {
            let iconName = "ios-home"
            
            switch(route.name){
                case "Profile": 
                iconName = "ios-person"
                break; 
                
                case "Groups": 
                iconName = "ios-people-sharp"
                break; 
                
                case "Settings": 
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
    
    const TabStack = createBottomTabNavigator(); 
    
    return(
        
            <TabStack.Navigator screenOptions={screenOptions}>
                <TabStack.Screen 
                    name="Profile" 
                    component={ProfileStackScreen}  
                    options={{headerShown: false}}
                />
                <TabStack.Screen 
                    name="Groups" 
                    component={GroupStackScreen}     
                    options={{headerShown: false}}
                />
                <TabStack.Screen 
                    name="Settings" 
                    component={SettingsStackScreen} 
                    options={{headerShown: false}}
                />
            </TabStack.Navigator>
    );
}