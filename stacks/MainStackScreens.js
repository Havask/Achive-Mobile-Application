import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons"
import {GroupProvider} from "../context/GroupContext"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import {
            GroupScreen, 
            CreateGroupScreen, 
            RoutineScreen, 
            TasksScreen,
            Scoreboard,
            JoinGroup, 
            Scanner,
            Chat,
            AddTask, 
            Explore, 
            GroupFeeds,
        
        } from "../screens/GroupTab"
import {
            SettingScreen, 
            NewPassword,
            NewUsername, 
            NewEmail,
            UserSettingScreen,

        } from "../screens/settingTab"
import {
        FeedScreen, 

        } from "../screens/FeedTab"

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Drawer = createDrawerNavigator();

function DrawerScreen() {
    return (
        <Drawer.Navigator>
           
            <GroupStack.Screen name="CreateGroup" component={GroupScreen} />
  
        </Drawer.Navigator>
    );
  }

const GroupStack = createNativeStackNavigator();
    
function GroupStackScreen() {

    return (
        <GroupProvider>
            <GroupStack.Navigator>
                <GroupStack.Screen name="Group" component={GroupScreen} options={{headerShown: false}}/>
                <GroupStack.Screen name="CreateGroup" component={CreateGroupScreen} options={{headerShown: false}}/>
                <GroupStack.Screen name="Routine" component={RoutineScreen} options={{headerShown: false}}/>
                <GroupStack.Screen name="Tasks" component={TasksScreen} options={{headerShown: false}}/>
                <GroupStack.Screen name="Scoreboard" component={Scoreboard} options={{headerShown: false}}/>
                <GroupStack.Screen name="Scanner" component={Scanner} options={{headerShown: false}}/>
                <GroupStack.Screen name="joingroup" component={JoinGroup} options={{headerShown: false}}/>
                <GroupStack.Screen name="AddTask" component={AddTask} options={{headerShown: false}}/>
                <GroupStack.Screen name="Explore" component={Explore} options={{headerShown: false}}/>
                <GroupStack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
                <GroupStack.Screen name="GroupFeeds" component={GroupFeeds} options={{headerShown: false}}/>
                <GroupStack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
        
            </GroupStack.Navigator>
        </GroupProvider>
    );
}

const ProfileStack = createNativeStackNavigator();

function FeedStackScreen(){
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Feed" component={FeedScreen} options={{headerShown: false}}/>
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
            <SettingsStack.Screen name="UsersSetting" component={UserSetting} options={{headerShown: false}} tabBarVisible={false} />

        </SettingsStack.Navigator>
    );
}



export default MainStackScreens = () => {

    const screenOptions = (({route}) => ({
        tabBarStyle: { display: "none" }, 

        tabBarStyle: {
            backgroundColor: "#FFFFFF", 
            paddingBottom: 20,
            height: 80,
     
        },
        
        
        tabBarIcon: ({focused}) => {
            let iconName = "ios-home"
            
            switch(route.name){
                case "Feed": 
                iconName = "ios-filter"
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
                color={focused ? "#191919" : "#666666"} 
            />;
        },
    }
    ))
    /*
    if (route.state.routes[route.state.index].name === "Chat") {
        navigation.setOptions({ tabBarVisible: false })
      }
      else {
        navigation.setOptions({ tabBarVisible: true })
      }
    
      */
    const TabStack = createBottomTabNavigator(); 

    return(
            <TabStack.Navigator     
            screenOptions={screenOptions}
            initialRouteName = "Groups">
                
                <TabStack.Screen 
                    name="Feed" 
                    component={FeedStackScreen}  
                    options={{headerShown: false}}
                />
                <TabStack.Screen 
                    name="Groups" 
                    component={GroupStackScreen}     
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

