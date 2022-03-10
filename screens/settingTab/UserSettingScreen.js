import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { Alert } from "react-native";

export default UserSetting = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 


  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              User settings:
         </Text>
        </Main>

        <SignUp onPress={() => navigation.push("Username")}>
          <Text small center> 
            <Text bold color="#ffffff">Update username</Text>
          </Text>
        </SignUp>

        <SignUp onPress={() => navigation.push("Email")}>
          <Text small center > 
            <Text bold color="#ffffff">Update Email</Text>
          </Text>
        </SignUp>

        <SignUp onPress={() => navigation.push("Password")}>
          <Text small center> 
            <Text bold color="#ffffff">Update password</Text>
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