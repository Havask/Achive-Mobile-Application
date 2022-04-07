import React, {useContext} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons"
import {GroupProvider} from "../context/GroupContext"
import {UserContext} from "../context/UserContext";
import {DrawerNavigatorItem} from '@react-navigation/drawer'

import {View, Text, StyleSheet, ImageBackground, Image} from "react-native"; 
import { ScrollView } from "react-native-gesture-handler";


export default SideBar = ({...props}) => {

    const [user, setUser] = useContext(UserContext); 

    return (
        <ScrollView>
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
                <DrawerNavigatorItem {...props}/> 
            </View>
        </ScrollView>
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