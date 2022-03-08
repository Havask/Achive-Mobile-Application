import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";

// lag en back buttom
export default NewEmailScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [loading, setLoading] = useState(false); 
  const [NewEmail, setNewEmail] = useState(); 

  const UpdateUserEmail = async () => {

    await firebase.UpdateEmail(NewEmail); 
    setUser({
      email: NewEmail, 
    })
  }; 

  return(
    <Container>
      <ScrollView>
      <KeyboardAvoidingView>
       <Main>
         <Text title semi center color="#88d498">
              New Email: 
         </Text>
        </Main>
        <Auth>
          <AuthContainer>
            <AuthTitle> New Email:</AuthTitle>
            <AuthField 
              onChangeText={(email) => setNewEmail(email.trim())}
              value={email}
            />
          </AuthContainer>
        </Auth>
        
        <SignUpContainer onPress={UpdateUserEmail} disable={loading}>
          {loading ? (<Loading/>) : (
          <Text bold center color="#ffffff">
            Update Email</Text>
          )}
        </SignUpContainer>
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
