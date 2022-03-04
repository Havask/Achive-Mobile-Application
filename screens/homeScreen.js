import React, {useState, useContext} from "react";
import {Platform} from "react-native"; 
import styled from "styled-components/native"; 
import Text from "../components/Text.js";
import {AntDesign} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import {FirebaseContext} from "../context/FirebaseContext";
import {UserContext} from "../context/UserContext";

export default SignUpScreen = ({navigation}) => {

  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  };

  const signOut = async () => {
    const SignedOut = await firebase.SignOutUser();
    if(SignedOut){
      setUser(state => ({...state, isLoggedIn: null}))
    }
  };

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              Home Screen:
         </Text>
        </Main>

        <ProfilePhotoContainer onPress={pickImage}>
          <ProfilePhoto 
            source={user.profilePhotoUrl == "default"
                    ? require("../logo/logo.png")
                    : { uri: user.profilePhotoUrl}
            }
          />
        </ProfilePhotoContainer>

        <Text medium bold center>
          {user.username}
        </Text>

        <LogOut onPress={signOut}>
          <Text medium center color="#88d498">
            Log Out
          </Text>
        </LogOut>
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

const LogOut = styled.TouchableOpacity`
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