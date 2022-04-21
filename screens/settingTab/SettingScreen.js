import React, {useState, useContext, Component} from "react";
import styled from "styled-components/native"; 
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { Alert } from "react-native";

import { NativeBaseProvider, Box, Text, Pressable, Heading, IconButton, 
  Icon, HStack, Avatar, VStack, Spacer, Center, Image, Divider} from "native-base";
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
    <Center w="100%">
    <Pressable onPress={() => console.log("I'm Pressed")} _pressed={{opacity: 0.5}}>
      <HStack justifyContent="center" space={2} p="7">
        <Avatar bg="green.500" w="100" h="100" source={user.profilePhotoUrl == "default"
                        ? require("../../assets/logo.png")
                        : { uri: user.profilePhotoUrl}
                }>
        </Avatar> 
      </HStack>;
    </Pressable>

      <Box maxW="80%" w="100%">
        <VStack space={3}>
          <Divider />
          <Pressable onPress={() => console.log("I'm Pressed")} _pressed={{opacity: 0.5}}>
            <HStack w="100%" justifyContent="space-between" alignItems="center" >

              <Ionicons 
                  name={"person-circle-outline"} 
                  size={50} />
              <Text color="coolGray.800" bold>
                User settings
              </Text>

              <Ionicons 
                  name={"chevron-forward-outline"} 
                  size={30} />
          
            </HStack>
            </Pressable>
          <Divider />

          <Pressable onPress={() => console.log("I'm Pressed")} _pressed={{opacity: 0.5}}>
            <HStack w="100%" justifyContent="space-between" alignItems="center" >
                <Ionicons 
                    name={"lock-closed-outline"} 
                    size={50} />
                <Text color="coolGray.800" bold>
                  Privicy & Security
                </Text>

                <Ionicons 
                    name={"chevron-forward-outline"} 
                    size={30} />
              </HStack>
          </Pressable>
          <Divider />
          <Pressable onPress={() => console.log("I'm Pressed")} _pressed={{opacity: 0.5}}>
            <HStack w="100%" justifyContent="space-between" alignItems="center" >
                <Ionicons 
                    name={"notifications-circle-outline"} 
                    size={50} />
                <Text color="coolGray.800" bold>
                  Notification
                </Text>

                <Ionicons 
                    name={"chevron-forward-outline"} 
                    size={30} />
              </HStack>
          </Pressable>
          <Divider />
          <Pressable onPress={() => console.log("I'm Pressed")} _pressed={{opacity: 0.5}}>
            <HStack w="100%" justifyContent="space-between" alignItems="center" >
                <Ionicons 
                    name={"trash-outline"} 
                    size={50} />
                <Text color="coolGray.800" bold>
                Delete User 
                </Text>

                <Ionicons 
                    name={"chevron-forward-outline"} 
                    size={30} />
              </HStack>
          </Pressable>

          <Divider />
          <Pressable onPress={() => console.log("I'm Pressed")} _pressed={{opacity: 0.5}}>
            <HStack w="100%" justifyContent="space-between" alignItems="center" >
                <Ionicons 
                    name={"log-out-outline"} 
                    size={50} />
                <Text color="coolGray.800" bold>
                Log Out 
                </Text>

                <Ionicons 
                    name={"chevron-forward-outline"} 
                    size={30} />
              </HStack>
          </Pressable>

            <Divider />
          <Pressable onPress={() => console.log("I'm Pressed")} _pressed={{opacity: 0.5}}>
            <HStack w="100%" justifyContent="space-between" alignItems="center" >
              <Ionicons 
                  name={"refresh-circle-outline"} 
                  size={50} />
              <Text color="coolGray.800" bold>
                Clear Cache
              </Text>
              <Ionicons 
                  name={"chevron-forward-outline"} 
                  size={30} />
            </HStack>
          </Pressable>
            <Divider />
        </VStack>
      </Box>
    </Center>


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
