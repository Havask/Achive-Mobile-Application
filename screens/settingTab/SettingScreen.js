import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { Alert } from "react-native";

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
    setUser({isLoggedIn: null}); 
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

const SignUp = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 68px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
  margin-bottom: 32px;
`; 
