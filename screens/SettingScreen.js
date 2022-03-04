import React, {useState, useContext} from "react";
import {Platform} from "react-native"; 
import styled from "styled-components/native"; 
import Text from "../components/Text.js";
import {AntDesign} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import {FirebaseContext} from "../context/FirebaseContext";
import {UserContext} from "../context/UserContext";



export default SettingScreen = ({navigation}) => {

//lag en delete user funksjon


  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 


  const signOut = async () => {

    setLoading(true);
    setUser({isLoggedIn: null}); 
  };

  const deleteUser = async () => {
    const user = await firebase.getCurrentUser()
    await firebase.DeleteUser(user)
  }

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              User settings:
         </Text>
        </Main>


        <SignUp onPress={signOut}>
          <Text small center> 
              <Text bold color="#88d498">Log Out</Text></Text>
        </SignUp>


        <SignUp onPress={deleteUser}>
          <Text small center> 
              <Text bold color="#88d498">Delete User</Text></Text>
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