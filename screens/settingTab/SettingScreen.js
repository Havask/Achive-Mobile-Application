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
    ButtonAlert(); 
    setLoading(true);
    setUser({isLoggedIn: null}); 
  };

  const deleteUser = async () => {
    //promt the user with "Are you sure you want to delete?"
    await firebase.DeleteUser()
    setUser({isLoggedIn: null}); 
  }; 

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              User settings:
         </Text>
        </Main>

        <SignUp onPress={() => navigation.push("Username")}>
          <Text small center> 
            <Text bold color="#88d498">Update username</Text>
          </Text>
        </SignUp>

        <SignUp onPress={() => navigation.push("Email")}>
          <Text small center> 
            <Text bold color="#88d498">Update Email</Text>
          </Text>
        </SignUp>

        <SignUp onPress={() => navigation.push("Password")}>
          <Text small center> 
            <Text bold color="#88d498">Update password</Text>
          </Text>
        </SignUp>

        <SignUp onPress={deleteUser}>
          <Text small center> 
            <Text bold color="#88d498">Delete User</Text>
          </Text>
        </SignUp>

        <SignUp onPress={signOut}>
          <Text small center> 
            <Text bold color="#88d498">Log Out</Text>
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
  margin-top: 16px; 
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