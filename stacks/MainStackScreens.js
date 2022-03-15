import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons"
import {
            GroupScreen, 
            CreateGroupScreen, 
            RoutineScreen, 
            TasksScreen,
            Scoreboard,
            JoinGroup, 
            CameraView,
        
        } from "../screens/GroupTab"
import {
            SettingScreen, 
            NewPassword,
            NewUsername, 
            NewEmail,
            UserSettingScreen,

        } from "../screens/settingTab"
import {
            ProfileScreen, 

        } from "../screens/profileTab"

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GroupStack = createNativeStackNavigator();
    
function GroupStackScreen() {
    return (
        <GroupStack.Navigator>
            <GroupStack.Screen name="Group" component={GroupScreen} options={{headerShown: false}}/>
            <GroupStack.Screen name="CreateGroup" component={CreateGroupScreen} options={{headerShown: false}}/>
            <GroupStack.Screen name="Routine" component={RoutineScreen} options={{headerShown: false}}/>
            <GroupStack.Screen name="Tasks" component={TasksScreen} options={{headerShown: false}}/>
            <GroupStack.Screen name="Scoreboard" component={Scoreboard} options={{headerShown: false}}/>
            <GroupStack.Screen name="Camera" component={CameraView} options={{headerShown: false}}/>
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
            <SettingsStack.Screen name="Settings" component={SettingScreen} options={{headerShown: false}}/>
            <SettingsStack.Screen name="Password" component={NewPassword} options={{headerShown: false}}/>
            <SettingsStack.Screen name="Username" component={NewUsername} options={{headerShown: false}}/>
            <SettingsStack.Screen name="Email" component={NewEmail} options={{headerShown: false}}/>
            <SettingsStack.Screen name="UsersSetting" component={UserSetting} options={{headerShown: false}}/>

        </SettingsStack.Navigator>
    );
}

export default MainStackScreens = () => {

    const screenOptions = (({route}) => ({

        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#222222", 
            paddingBottom: 8,
        },
        
        tabBarIcon: ({focused}) => {
            let iconName = "ios-home"
            
            switch(route.name){
                case "Profiles": 
                iconName = "ios-person"
                break; 
                
                case "Groups": 
                iconName = "ios-people-sharp"
                break; 
                
                case "Setting": 
                iconName = "ios-settings"
                break; 
                
                default: 
                iconName = "ios-home"
            }
            return <Ionicons 
                name={iconName} 
                size={30} 
                color={focused ? "#ffffff" : "#666666"} 
            />;
        },
    }))
    
    const TabStack = createBottomTabNavigator(); 
    
    return(
        
            <TabStack.Navigator screenOptions={screenOptions}>
                <TabStack.Screen 
                    name="Groups" 
                    component={GroupStackScreen}     
                    options={{headerShown: false}}
                />
                <TabStack.Screen 
                    name="Profiles" 
                    component={ProfileStackScreen}  
                    options={{headerShown: false}}
                />
                <TabStack.Screen 
                    name="Setting" 
                    component={SettingsStackScreen} 
                    options={{headerShown: false}}
                />
            </TabStack.Navigator>
    );
}