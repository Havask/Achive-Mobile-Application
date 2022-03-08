import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import * as Yup from "yup";

export default NewPasswordScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [loading, setLoading] = useState(false); 

  const [newUser, setNewUser] = useState({
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = (prop) => (event) => {
    setNewUser({ ...newUser, [prop]: event.target.value });
  };

  const stepOneValidationSchema = Yup.object({
    Password: Yup.string().required("This field is required"),

    ConfirmPassword: Yup.string().when("Password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  });

  const password = async () => {
    stepOneValidationSchema(); 
    await firebase.UpdatePassword(newUser.Password); 
  }

  const ResetPassword = async () => {

    const uid = await firebase.getCurrentUser().uid; 
    const userInfo = await firebase.getUserInfo(uid)
    await firebase.updateUserPassword(userInfo.email); 
  }; 

  return(
    <Container>
      <ScrollView>
      <KeyboardAvoidingView>
       <Main>
         <Text title semi center color="#88d498">
              New password: 
         </Text>
        </Main>
        <Auth>
          <AuthContainer>
            <AuthTitle> New password</AuthTitle>
            <AuthField 
              autoCapitalize="none" 
              autoCompleteType="password" 
              autocorrect={false} 
              autoFocus={true} 
              secureTextEntry={true}
              onChangeText={handleChange("ConfirmPassword")}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle> Confirm password</AuthTitle>
            <AuthField 
              autoCapitalize="none" 
              autoCompleteType="password" 
              autocorrect={false} 
              autoFocus={true} 
              secureTextEntry={true}
              onChangeText={handleChange("Password")}
              value={password}
            />
          </AuthContainer>
        </Auth>

        <SignUpContainer onPress={password} disable={loading}>
          {loading ? (<Loading/>) : (
            <Text bold center color="#ffffff">
            Change password</Text>
          )}
        </SignUpContainer>

        <SignUp onPress={ResetPassword}>
          <Text small center> 
              Forgot the password? <Text bold color="#88d498">Reset password</Text>
          </Text>
        </SignUp>
        </KeyboardAvoidingView>
      </ScrollView>
     </Container>
  );
}

const Container = styled.KeyboardAvoidingView`
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

const Loading = styled.ActivityIndicator.attrs(props => ({
  color: "#fffffff",
  size: "small", 
}))``; 

const SignUp = styled.TouchableOpacity`
  margin-top: 16px; 
`; 