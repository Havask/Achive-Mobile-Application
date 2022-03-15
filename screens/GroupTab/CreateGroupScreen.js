import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {AntDesign} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library';
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {FlatList} from "react-native"; 

import MemberItem from "../../components/MemberItem";

/*
Trenger kun å legge til navn på medlemmene
*/
export default CreateGroupScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false); 
  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext); 
  //lag sånn at gruppa får et profilbilde
  
  
  useEffect(() => {

  }, [Members])

  const CreateNewGroup = async () => {

    await firebase.CreateGroup(Groupname, Members); 

    //lag en liste med folk som skal bli adda
    navigation.push("Group"); 
  };
  
  const [Groupname, setGroupName] = useState(""); 
  const [enteredMember, setenteredMember] = useState(""); 
  const [Members, setMember] = useState([]); 


  const MemberInputHandler = (enteredText) =>{
    setenteredMember(enteredText)
  };

  const AddHandler = member => {
    setMember(currentmember => [
        ...currentmember, 
        {id: Math.random().toString(), value: member}
    ]); 
  }

  const removeMemberHandler = goalId => {
    setMember(currentmember =>{
        /* return a new array filter based on a new critiria */
        return currentmember.filter((goal) => goal.id !== goalId); 
    });
  }

  const addMemberHandler = () => {
    AddHandler(enteredMember);
    setenteredMember(""); 
  }

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

          <AuthContainer>
            <AuthTitle>Add members</AuthTitle>
            <AuthField 
              autocorrect={false} 
              onChangeText={MemberInputHandler}
              value={enteredMember}
            />
          </AuthContainer>
        </Auth>

        <Auth>
          <Button title="Add New Goal" onPress={addMemberHandler}/>
        </Auth>
        
        <SignUpContainer onPress={CreateNewGroup} disable={loading}>
          {loading ? (<Loading/>) : (
          <Text bold center color="#ffffff">
            Create Group</Text>
          )}
        </SignUpContainer>


        <FlatList 
              keyExtractor={(item,index) => item.id} 
              data ={Members} 
              renderItem={itemData => <MemberItem 
              id={itemData.item.id} 
              onDelete ={removeMemberHandler} 
              title={itemData.item.value}/>} 
          />
        </KeyboardAvoidingView>
      </ScrollView>
     </Container>
    );
}


const Button = styled.Button`

`;

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
  flex: 1; 
`;