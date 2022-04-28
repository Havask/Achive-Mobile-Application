import React, {useState, useContext, useEffect} from "react";
import styled, {ThemeContext, ThemeProvider} from "styled-components/native"; 
import Text from "../../components/Text.js";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import QRCode from 'react-native-qrcode-svg';
import { Svg } from "react-native-svg";
import { ColorPicker } from 'react-native-status-color-picker';
import Checkbox from 'expo-checkbox';
import {AntDesign} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

//https://reactnativeexample.com/customizable-color-picker-for-your-beautiful-react-native-apps/

/*
-Lag en privat/offentlig checkbox 
-Sett gruppene inn i async storage for å raskt laste de inn når man starter appen
-Prøv å join en gruppe  
*/

export default CreateGroupScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false); 
  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext);   
  const [Groupname, setGroupName] = useState(""); 
  const [Color, setColor] = useState('#F44336'); 
  const [Privacy, setPrivacy] = useState(false);
  const [GroupPhoto, setGroupPhoto] = useState(); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setGroupPhoto(result.uri);
    }
  };

  const state = {
    colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", 
    "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"],
    selectedColor: '#F44336', 
  };

  const CreateNewGroup = async () => {

    try{

      setLoading(true);

      const GroupID = makeid(6); 
      const group = {Groupname, GroupID, Color, Privacy, GroupPhoto}
  
      //qr = generateQR(id); 
  
      await firebase.CreateNewGroup(group); 
      navigation.push("HomeScreen"); 

    }catch(error){
      console.log("Error @CreateNewGroup", error)
    }
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

  const onSelect = color => setColor(color);

  return(
    <Container>
      <ScrollView>
      <KeyboardAvoidingView>
       <Main>
         <Text title semi center color="#88d498">
              Create new group:
         </Text>
        </Main>

        <ProfilePhotoContainer onPress={pickImage}>
          {GroupPhoto ? ( 
            <ProfilePhoto source={{uri: GroupPhoto}}/>
          ) : (
            <DefaultProfilePhoto>
              <AntDesign name="plus" size={24} color="#88d498"/>
            </DefaultProfilePhoto>
          )}
        </ProfilePhotoContainer>

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
        <BoxContainer>
           <Text medium center> 
                  Set this group private?   
          </Text>
              <BoxStyle
              value={Privacy}
              onValueChange={setPrivacy}
              color={Privacy ? "#88d498" : "#88d498"}
              />
        </BoxContainer>

        <ColorTitle>Choose theme</ColorTitle>

        <ColorPicker
          colors={state.colors}
          selectedColor={state.selectedColor}
          onSelect={onSelect}
        />
        
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
  margin-top: 40px; 
  margin-bottom: 30px; 
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
  margin-top: 30px; 
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


const ColorTitle = styled(Text)`
  align-items: center; 
  justify-content: center; 
  color: #8e93a1;
  font-size: 12px; 
  text-transform: uppercase; 
  font-weight: 300; 
`; 

const BoxStyle = styled(Checkbox)`
  align-items: center; 
  justify-content: center; 
  margin: 0px 10px 3px; 
`; 

const BoxContainer = styled.View`
  flex-direction: row; 
  margin-bottom: 32px;
  justify-content: center; 
`; 

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 90px; 
  height: 90px; 
  border-radius: 48px; 
  align-self: center; 
  overflow: hidden; 
  margin-bottom: 32px;
`; 

const DefaultProfilePhoto = styled.View`
  align-items: center; 
  justify-content: center; 
  flex: 1; 
`; 

const ProfilePhoto = styled.Image`
  width: 90px;
  height: 90px; 
  border-radius: 64px; 
`;