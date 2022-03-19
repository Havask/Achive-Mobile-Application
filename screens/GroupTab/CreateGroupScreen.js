import React, {useState, useContext, useEffect} from "react";
import styled, {ThemeContext, ThemeProvider} from "styled-components/native"; 
import Text from "../../components/Text.js";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import QRCode from 'react-native-qrcode-svg';
import { Svg } from "react-native-svg";
import AsyncStorageAdapter from '../../context/LocalStorageContext';

const { getData, storeData, storeMultipleData,
  getMultipleData, getAllData, removeData, removeMultipleData,
  getAllKeys, clearAll} = new AsyncStorageAdapter("@Achive");

export default CreateGroupScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false); 
  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext);   
  const [Groupname, setGroupName] = useState(""); 

  

  const CreateNewGroup = async () => {

    id = makeid(6); 
    console.log(id);

    qr = generateQR(id); 

    await firebase.CreateNewGroup(Groupname, id); 

    //lag en liste med folk som skal bli adda
    navigation.push("Group"); 
  };

  const generateQR = async (text) => {

    return(
      <QRCode
        value= {text}
      />
    ); 
  }; 
  

  const makeid = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
   }
    return result;
  }

  const setcolor = color => {


  }

  const theme = {
    main: "mediumseagreen"
  };

  return(
    <Container>
      <ScrollView>
      <KeyboardAvoidingView>
       <Main>
         <Text title semi center color="#88d498">
              Create new group:
         </Text>
        </Main>

        <Auth>
          <AuthContainer>
            <AuthTitle>Group Name</AuthTitle>
            <AuthField 
              autoCapitalize="none" 
              autocorrect={false} 
              onChangeText={(Groupname) => setGroupName(Groupname)}
              value={Groupname}
            />
          </AuthContainer>
        </Auth>

        <ColorView>
          <AuthTitle>Choose color: </AuthTitle>

          <ThemeProvider  theme={theme}>
            <ProfilePhotoContainer  theme={{ main: "royalblue" }}/>
          </ThemeProvider>
            <ProfilePhotoContainer/> 
            <ProfilePhotoContainer/>

        </ColorView>
        
        <SignUpContainer onPress={CreateNewGroup} disable={loading}>
          {loading ? (<Loading/>) : (
          <Text bold center color="#ffffff">
            Create Group</Text>
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
  margin-bottom: 10px; 
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


const ColorView = styled.View`
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 30px;
`; 

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.main};
  width: 50px; 
  height: 50px; 
  border-radius:48px; 
  margin: 3px;
  overflow: hidden; 
`; 
