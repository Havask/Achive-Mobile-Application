import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../components/Text.js";
import {AntDesign} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library';

import {FirebaseContext} from "../context/FirebaseContext";
import {UserContext} from "../context/UserContext";

export default SignUpScreen = ({navigation}) => {

  const [username, setUsername] = useState(); 
  const [email, setEmail] = useState(); 
  const [password, setPassword] = useState(); 
  const [loading, setLoading] = useState(false); 
  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext); 

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

  const signUp = async () => {

    setLoading(true);
    const user = {username, email, password, profilePhoto}

    try{
      const createdUser = await firebase.createUser(user)
      setUser({...createdUser, isLoggedIn: true}); 
    }catch{
      console.log("Error @SignUp", error); 
    }finally{
      setLoading(false); 
    }
  };

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              Sign up to get started:
         </Text>
        </Main>
        <ProfilePhotoContainer onPress={pickImage}>
          {profilePhoto ? ( 
            <ProfilePhoto source={{uri: profilePhoto}}/>
          ) : (
            <DefaultProfilePhoto>
              <AntDesign name="plus" size={24} color="#88d498"/>
            </DefaultProfilePhoto>
          )}
        </ProfilePhotoContainer>

        <Auth>
          <AuthContainer>
            <AuthTitle>Name</AuthTitle>
            <AuthField 
              autoCapitalize="none" 
              autocorrect={false} 
              keyboardType="username"
              onChangeText={(username) => setUsername(username.trim())}
              value={username}
              />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>Email address</AuthTitle>
            <AuthField 
              autoCapitalize="none" 
              autoCompleteType="email" 
              autocorrect={false} 
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
              />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>password</AuthTitle>
            <AuthField 
              autoCapitalize="none" 
              autoCompleteType="password" 
              autocorrect={false} 
              autoFocus={true} 
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password.trim())}
              value={password}
              />
          </AuthContainer>
        </Auth>

        <SignUpContainer onPress={signUp} disable={loading}>
          {loading ? (<Loading/>) : (
          <Text bold center color="#ffffff">
            Sign Up</Text>
          )}
        </SignUpContainer>

        <SignUp onPress={() => navigation.push("LogInScreen")}>
          <Text small center> 
              Already a user? <Text bold color="#88d498">Sign In</Text></Text>
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


const Auth = styled.View`
  margin: 16px 32px 32px; 
`; 

const AuthContainer = styled.View`
  margin-bottom: 32px;
`; 

const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 12px; 
  text-transform: uppercase; 
  font-weight: 300; 
`; 

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1; 
  border-bottom-width: 1px;
  height: 48px; 
`; 

const SignUpContainer = styled.TouchableOpacity`
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

const Loading = styled.ActivityIndicator.attrs(props => ({
  color: "#fffffff",
  size: "small", 
}))``; 

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 80px; 
  height: 80px; 
  border-radius: 40px; 
  align-self: center; 
  margin-top: 16px;
  overflow: hidden; 
`; 

const DefaultProfilePhoto = styled.View`
  align-items: center; 
  justify-content: center; 
  flex: 1; 
`; 

const ProfilePhoto = styled.Image`
  flex 1: 
`;