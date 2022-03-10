import React, {useState, useContext} from "react";
import {Platform} from "react-native"; 
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {AntDesign} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";

export default GroupScreen = ({navigation}) => {

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

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              Groups:
         </Text>
        </Main>

        <ProfilePhotoContainer onPress={pickImage}>
          <ProfilePhoto 
            source={user.profilePhotoUrl == "default"
                    ? require("../../assets/logo.png")
                    : { uri: user.profilePhotoUrl}
            }
          />
        </ProfilePhotoContainer>

        <GroupContainer onPress={() => navigation.push("CreateGroup")}>
          <Text bold center color="#ffffff">
              Add new group
          </Text>
        </GroupContainer>
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
  margin-top: 16px; 
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

const GroupContainer = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 68px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
  margin-bottom: 32px;
`;