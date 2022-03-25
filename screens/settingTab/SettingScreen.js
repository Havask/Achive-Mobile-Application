import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { Alert } from "react-native";
import AsyncStorageAdapter from '../../context/LocalStorageContext';

const {clearAll} = new AsyncStorageAdapter("@Achive");

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
    setUser({isLoggedIn: null}); 
  };
  
  const deleteUser = async () => {
    ButtonAlert(); 
    await firebase.DeleteUser()
    setUser({isLoggedIn: null}); 
  }; 

  const clearCache = async () => {
    try {
      const isClear = await clearAll(); // Return Boolean value
    } catch (err) {
      throw err;
    }
  }; 

  return(
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
    );
}

const Container = styled.View`
    flex: 1; 
`;

const Main = styled.View`
  margin-top: 80px; 
  margin-bottom: 50px; 
`;

const GroupContainer = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 48px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
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

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 80px; 
  height: 80px; 
  border-radius: 40px; 
  align-self: center; 
  margin-top: 16px;
  overflow: hidden; 
`; 

const ProfilePhoto = styled.Image`
  width: 128px;
  height: 128px; 
  border-radius: 64px; 
`;