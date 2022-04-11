import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import { KeyboardAvoidingView, ScrollView, Alert} from "react-native";
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {Switch} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

//https://hilalyldz.medium.com/keep-user-logged-in-with-asyncstorage-and-authenticatication-on-expo-and-firebase-4617b206e481

//https://www.youtube.com/watch?v=-N12hjV3DPQ

export default LogInScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [User, setUser] = useContext(UserContext); 

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const [Isloggedin, setIsloggedin] = useState(false); 
  const [RememberMe, setRememberMe] = useState(true);  

  const ButtonAlert = () =>
    Alert.alert(
      "User not found",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete the account"}
      ]
  );

  const Storage = async () => {
    try{
      const StoredEmail =  await AsyncStorage.getItem("email");
      const StoredPassword = await AsyncStorage.getItem("password");

      if (StoredEmail !== null){

        await firebase.SignInUser(StoredEmail, StoredPassword);
        
          const uid =  await firebase.getCurrentUser().uid; 
          const userInfo = await firebase.getUserInfo(uid)
      
          setUser({
            username: userInfo.username,
            email: userInfo.email, 
            uid, 
            groups: [], 
            profilePhotoUrl: userInfo.profilePhotoUrl,
            isLoggedIn: true, 
          })

          const jsonValue = JSON.stringify(User)
          await SecureStore.setItemAsync("User", jsonValue);
        }
        }catch{
          console.log("could not find stored email and password")
      }
  };

  useEffect(() => {
    Storage(); 
  }, []);

  const handleLogin = async () => {

    if(RememberMe === true){
      if (email && password) {

        try{          
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);

          await firebase.SignInUser(email, password);
          
          const uid = await firebase.getCurrentUser().uid; 
          const userInfo = await firebase.getUserInfo(uid)

          setUser({
            username: userInfo.username,
            email: userInfo.email, 
            uid, 
            groups: [], 
            profilePhotoUrl: userInfo.profilePhotoUrl,
            isLoggedIn: true, 
          })

          const jsonValue = JSON.stringify(User)
          await SecureStore.setItemAsync("User", jsonValue);

        }catch{
          ButtonAlert(); 
        }
      } 
    }
    else{

      await firebase.SignInUser(email, password);
      const uid = await firebase.getCurrentUser().uid; 
      const userInfo = await firebase.getUserInfo(uid)
  
      setUser({
        username: userInfo.username,
        email: userInfo.email, 
        uid, 
        groups: [], 
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true, 
      })
      
    }
  };

  const toggleSwitch = () => setRememberMe(previousState => !previousState);

  return(
    <Container>
        <Main>
      <ScrollView>
      <KeyboardAvoidingView>
          <AchiveLogo source={require("../../logo/logo.png")} />

          <Auth>
            <AuthContainer>
              <AuthTitle>Email address</AuthTitle>
              <AuthField 
                autoCapitalize="none" 
                autoCompleteType="email" 
                autocorrect={false} 
                autoFocus={true} 
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail(email.trim())}
                showSoftInputOnFocus={false}
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
                value={password}
                onChangeText={password => setPassword(password.trim())}
                showSoftInputOnFocus={false}
              />
            </AuthContainer>
          </Auth>

        <StayLoggedIn>
            <Text small> 
                Keep me logged in </Text>
          <SwitchView>
            <Switch 
              trackColor={{ false: "#767577", true: "#88d498"}}
              thumbColor={Isloggedin ? "#88d498" : "#cccccc"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={RememberMe}
            />
          </SwitchView>
        </StayLoggedIn>

          <SignInContainer onPress={handleLogin} disable={loading}>
            {loading ? (<Loading/>) : (
            <Text bold center color="#ffffff">
              Sign In</Text>
            )}
          </SignInContainer>

          <SignUp onPress={() => navigation.push("SignUpScreen")}>
            <Text small center> 
                New to Achive? <Text bold color="#88d498">Sign Up</Text></Text>
          </SignUp>

        </KeyboardAvoidingView>
      </ScrollView>
        </Main>
    </Container>
  );
}

const AchiveLogo = styled.Image`
    align-items: center; 
    justify-content: center; 
    width: 200px;
    height: 100px;
    margin: 0px 90px 0px; 
`;

const Container = styled.ScrollView`
    flex: 1; 
`;

const Main = styled.View`
  margin-top: 150px; 
`;

const Auth = styled.View`
  margin: 50px 32px 32px; 
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

const SignInContainer = styled.TouchableOpacity`
  margin: 0 32px; 
  margin-bottom: 10px;
  height: 48px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
`;

const SignUp = styled.TouchableOpacity`
  margin-top: 0px; 
  margin-bottom: 20px;
`; 

const Loading = styled.ActivityIndicator.attrs(props => ({
  color: "#fffffff",
  size: "small", 
}))``; 


const StayLoggedIn = styled.View`
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 20px;
`; 

const SwitchView = styled.View`

`; 



