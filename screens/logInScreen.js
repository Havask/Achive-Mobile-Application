import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import { KeyboardAvoidingView } from "react-native";
import Text from "../components/Text.js";
import {FirebaseContext} from "../context/FirebaseContext";
import {UserContext} from "../context/UserContext";


export default LogInScreen = ({navigation}) => {

  const [email, setEmail] = useState(); 
  const [password, setPassword] = useState(); 
  const [loading, setLoading] = useState(false); 
  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext); 

  const LogIn = async () => {
    setLoading(true);

    try{
      await firebase.SignInUser(email, password)
      const uid = firebase.getCurrentUser().uid; 
      const userInfo = await firebase.getUserInfo(uid)

      setUser({
        username: userInfo.username,
        email: userInfo.email, 
        uid, 
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true, 
      })

    }catch(error){
      alert(error.message)
    }finally{
      setLoading(false)
    }
  };

    return(

     <Container>
       <Main>
         <Text title semi center color="#88d498">
              Achive
         </Text>
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

        <SignInContainer onPress={LogIn} disable={loading}>
          {loading ? (<Loading/>) : (
          <Text bold center color="#ffffff">
            Sign In</Text>
          )}
        </SignInContainer>

        <SignUp onPress={() => navigation.push("SignUpScreen")}>
          <Text small center> 
              New to Achive? <Text bold color="#88d498">Sign Up</Text></Text>
        </SignUp>
       </Main>
     </Container>
    );
}


const Container = styled.KeyboardAvoidingView`

    flex: 1; 
`;

const Main = styled.View`

  margin-top: 192px; 
`;


const Auth = styled.View`
  margin: 64px 32px 32px; 
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


const Logo = styled.Image`

`