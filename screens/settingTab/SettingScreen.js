import React, {useState, useContext, Component} from "react";
import styled from "styled-components/native"; 
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { Alert } from "react-native";
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { NativeBaseProvider, Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center, Image } from "native-base";

import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

export default SettingScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 

  const ButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete the account", onPress: () => console.log("Delete Pressed") }
      ]
  );

  const signOut = async () => {
    firebase.SignOutUser(); 

    setUser({
      username: "",
      email: "", 
      uid: "", 
      groups: [], 
      profilePhotoUrl: "default",
      isLoggedIn: false, 
    })
  };
  
  const deleteUser = async () => {
    ButtonAlert(); 
    await firebase.DeleteUser()
    setUser({isLoggedIn: null}); 
  }; 

  const clearCache = async () => {
    try {
      await firebase.ClearCache()
    } catch (err) {
      throw err;
    }
  }; 

  return(

<Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between">
              <Avatar size="48px" source={{
          uri: item.avatarUrl
        }} />
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.fullName}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.timeStamp}
              </Text>
      </HStack>
  </Box>


/*
    <Container>
       <Main>
         <Text title bold center color="#88d498">
              Settings:
         </Text>
        </Main>

        <SignUp onPress={() => navigation.push("UsersSetting")}>
          <Text small center> 
            <Text bold color="#ffffff">User settings</Text>
          </Text>
        </SignUp>


        <SignUp onPress={deleteUser}>
          <Text small center> 
            <Text bold color="#ffffff">Delete User</Text>
          </Text>
        </SignUp>

        <SignUp onPress={signOut}>
          <Text small center> 
            <Text bold color="#ffffff">Log Out</Text>
          </Text>
        </SignUp>

        <SignUp onPress={clearCache}>
          <Text small center> 
            <Text bold color="#ffffff">Clear Cache</Text>
          </Text>
        </SignUp>
     </Container>
     */
    );
}

const Container1 = styled.View`
    flex: 1; 
`;

const Main = styled.View`
  margin-top: 80px; 
  margin-bottom: 50px; 
`;

const SignUp = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 68px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
  margin-bottom: 32px;
`; 
