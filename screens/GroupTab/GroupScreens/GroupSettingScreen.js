import React, {useState, useContext, Component} from "react";
import {FirebaseContext} from "../../../context/FirebaseContext";
import {UserContext} from "../../../context/UserContext";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"
import {Box, Text, Pressable, Heading, IconButton, 
  Icon, HStack, Avatar, VStack, Spacer, Center, Image, Divider} from "native-base";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

export default GroupSettingScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled){
      firebase.uploadProfilePhoto(result.uri)
      setUser((state) => ({ ...state, profilePhotoUrl: result.uri})); 
      //navigation.navigate('Group');
    }
  };

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

    //<ion-icon name="return-down-back-outline"></ion-icon>

    /*
    <Pressable onPress={() => navigation.push("Achive")} _pressed={{opacity: 0.5}}>
      <HStack justifyContent="flex-end" >
        <Ionicons 
                  name={"return-down-back-outline"} 
                  size={50} />
      </HStack>
    </Pressable>
    */
  };  

  return(
    <Center w="100%">
      <Pressable onPress={pickImage} _pressed={{opacity: 0.5}}>
        <HStack alignItems="center" justifyContent="space-between" space={2} pb="5" pt="5">
          <Avatar w="100" h="100" pb="1"
              source={user.profilePhotoUrl == "default"
                  ? require("../../../assets/default-profile.png")
                  : { uri: user.profilePhotoUrl}
                  }>
          </Avatar> 
        </HStack>
      </Pressable>

      <Box maxW="80%" w="100%">
        <VStack space={3}>
          <Divider />
          <Pressable onPress={() => navigation.push("UsersSetting")} _pressed={{opacity: 0.5}}>
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

          <Pressable onPress={deleteUser} _pressed={{opacity: 0.5}}>
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
          <Pressable onPress={signOut} _pressed={{opacity: 0.5}}>
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
          <Pressable onPress={clearCache} _pressed={{opacity: 0.5}}>
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

    );
}