import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";

export default NewUsername = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [loading, setLoading] = useState(false); 
  const [Username, setUsername] = useState(); 

  const NewUsername = async () => {

    await firebase.updateUsername(Username); 
  }

  return(
    <Container>
      <ScrollView>
      <KeyboardAvoidingView>
       <Main>
         <Text title semi center color="#88d498">
              New Name: 
         </Text>
        </Main>
        <Auth>
          <AuthContainer>
            <AuthTitle> New Username</AuthTitle>
            <AuthField 
              onChangeText={(username) => setUsername(email.trim())}
              value={Username}
            />
          </AuthContainer>
        </Auth>
        
        <SignUpContainer onPress={NewUsername} disable={loading}>
          {loading ? (<Loading/>) : (
          <Text bold center color="#ffffff">
            Update Name</Text>
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
