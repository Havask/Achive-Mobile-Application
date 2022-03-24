import React, {useState, useContext} from "react";
import {Platform} from "react-native"; 
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {AntDesign} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";

export default ProfileScreen = ({navigation}) => {

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
         <Text title bold center color="#88d498">
              Profile:
         </Text>
        </Main>

        <ProfilePhotoContainer onPress={pickImage}>
          <ProfilePhoto 
            source={user.profilePhotoUrl == "default"
                    ? require("../../logo/logo.png")
                    : { uri: user.profilePhotoUrl}
            }
          />
        </ProfilePhotoContainer>
        <UsernameContainer>
          <Text title bold margin="16px 0 32px 0">
            {user.username}
          </Text>
        </UsernameContainer>
 

        <StatsContainer>
            <StatContainer>
              <Text large light>5</Text>
              <Text>Task assigned</Text>
            </StatContainer>

            <StatContainer>
              <Text large light>2</Text>
              <Text>Task completed</Text>
            </StatContainer>
        </StatsContainer>

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

const UsernameContainer = styled.View`
    align-items: center; 
`;

const Main = styled.View`
  margin-top: 80px; 
  margin-bottom: 50px; 
`;

const LogOut = styled.TouchableOpacity`
  margin-bottom: 32px; 
`; 

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 100px; 
  height: 100px; 
  border-radius: 48px; 
  align-self: center; 
  margin-top: 16px;
  overflow: hidden; 
  margin-bottom: 32px;
`; 

const ProfilePhoto = styled.Image`
  width: 100px;
  height: 100px; 
  border-radius: 64px; 
`;

const StatsContainer = styled.View`
  flex-direction: row; 
  justify-content: space-between; 
  margin: 0 32px; 
  flex: 1; 
`;

const StatContainer = styled.View`
  align-items: center; 
  flex: 1; 
`; 
