import React, {useContext} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons"
import {GroupProvider} from "../context/GroupContext"
import {UserContext} from "../context/UserContext";


import {View, Text, StyleSheet, ImageBackground, Image} from "react-native"; 

import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

export default SideBar = ({...props}) => {

    const [user, setUser] = useContext(UserContext); 

    return (
        <DrawerContentScrollView>
            <ImageBackground
                source = {require("../assets/Header.jpg")}
                style = {{width: undefined, padding: 16, paddingTop: 48}}
                >
            <Image source = {user.profilePhotoUrl == "default"
                        ? require("../assets/logo.png")
                        : { uri: user.profilePhotoUrl}
                }/>
            <View>
                <Text style={{flexDirection: "row"}}>101</Text>
                <Ionicons name="md-people" size={16} color="rgba(255,255, 255,0.8)"/> 
            </View>
            </ImageBackground>

            <View styles={styles.container}>
                <DrawerItemList {...props}/> 
            </View>
        </DrawerContentScrollView>
    );
  }

const styles = StyleSheet.create({

    container: {
        flex: 1, 
    },
    
    profile: {
        width: 80,
        height: 80, 
        borderRadius: 40, 
        borderWidth: 3, 
        borderColor: "#FFF"
    }
})