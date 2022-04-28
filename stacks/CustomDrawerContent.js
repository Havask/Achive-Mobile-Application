import React, {useContext} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons"
import {GroupProvider} from "../context/GroupContext"
import {UserContext} from "../context/UserContext";
import {Flex,Box, Pressable, Heading, IconButton, Icon, HStack, 
    Avatar, VStack, Spacer, Center,Divider,Stack, Button, Input, Text, Image} from "native-base";
import {ImageBackground} from "react-native"; 

import {DrawerContentScrollView,DrawerItemList,} from '@react-navigation/drawer';

export default SideBar = ({...props}) => {

    const [user, setUser] = useContext(UserContext); 

    return (
        <DrawerContentScrollView>
            <ImageBackground
                source = {require("../assets/Header.jpg")}
                style = {{hight : 10, width: undefined, padding: 16, paddingTop: 30}}
                >
            <Avatar w="16" h="16" pb="1"
              source={user.profilePhotoUrl == "default"
                  ? require("../assets/default-profile.png")
                  : { uri: user.profilePhotoUrl}
                  }>
            </Avatar> 
            <Box pb="2" >
                <Text fontSize="2xl">{user.username}</Text>
            </Box>
            </ImageBackground>
        <Box>
            <DrawerItemList {...props}/> 
        </Box>
    </DrawerContentScrollView>
    );
  }

