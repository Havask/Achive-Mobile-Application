import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import { KeyboardAvoidingView, ScrollView} from "react-native";
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { View, Switch, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//https://hilalyldz.medium.com/keep-user-logged-in-with-asyncstorage-and-authenticatication-on-expo-and-firebase-4617b206e481

export default LogInScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext); 

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const [Isloggedin, setIsloggedin] = useState(false); 
  const [RememberMe, setRememberMe] = useState(false); 


  const handleLogin = async () => {

    try{
      await firebase.SignInUser(email, password);
      const uid = await firebase.getCurrentUser().uid; 
      const userInfo = await firebase.getUserInfo(uid)

      setUser({
        username: userInfo.username,
        email: userInfo.email, 
        uid, 
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true, 
      })
    }catch(error){
      alert("Unable to find this account")
    }finally{
      setLoading(false)
    }
  };

  const saveValueFunction = () => {
    if(RememberMe === true){
      if (email) {
        AsyncStorage.setItem('any_key_here', email);
        setEmail('');
      } 
    
      if (password) {
        AsyncStorage.setItem('any_key_here2', password);
        setPassword('');
      }
    }
    getValueFunction();
  };

  
  const getValueFunction = () => {

    if(email==null && password==null)
    {
      handleLogin();
    } 
    else{
        if (email) {
          AsyncStorage.getItem('any_key_here', email);
          setEmail('');
        } 
  
        if (password) {
          AsyncStorage.getItem('any_key_here2', password);
          setPassword('');
        }
  
        handleLogin(); 
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
                />
              </AuthContainer>

              <AuthContainer>
                <AuthTitle>password</AuthTitle>
                <AuthField 
                  let password = "havard100"
                  autoCapitalize="none" 
                  autoCompleteType="password" 
                  autocorrect={false} 
                  autoFocus={true} 
                  secureTextEntry={true}
                  value={password}
                  onChangeText={password => setPassword(password.trim())}
                  />
              </AuthContainer>
            </Auth>

          <StayLoggedIn>
              <Text small> 
                  Keep me logged in </Text>
            <SwitchView>
              <Switch 
                      trackColor={{ false: "#767577", true: "#767577"}}
                      thumbColor={Isloggedin ? "#88d498" : "#cccccc"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={RememberMe}/>
            </SwitchView>
          </StayLoggedIn>

            <SignInContainer onPress={saveValueFunction} disable={loading}>
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
    margin: 0px 90px 30px; 
`;

const Container = styled.ScrollView`
    flex: 1; 
`;

const Main = styled.View`
  margin-top: 180px; 
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