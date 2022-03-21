import React, {useState, useContext} from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default GroupScreen = ({navigation}) => {

  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 

  const [Groups, setGroups] = useState([]); 

  const DisplayGroups = () => {

    //Go to the user 
    //Må oppdatere user i databasen. Gå dit hent navnet forså 
    //hente gruppene. 

    //Must retrive the groups and idsplay them in a list

  }

  const RetriveGroupData = () => {
    
    const groups = firebase.RetriveGroupData(); 
   
    firebase.LoadGroups(groups)
  }

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              Groups:
         </Text>
        </Main>

        <ProfilePhotoContainer>
          <ProfilePhoto 
            source={user.profilePhotoUrl == "default"
                    ? require("../../assets/logo.png")
                    : { uri: user.profilePhotoUrl}
            }
          />
        </ProfilePhotoContainer>
          
        <Create>
        <CreateContainer onPress={() => navigation.push("CreateGroup")}>
          <Text bold center color="#ffffff">
              Create Group
          </Text>
        </CreateContainer>

        <CreateContainer onPress={() => navigation.push("joingroup")}>
          <Text bold center color="#ffffff">
              Join Group
          </Text>
        </CreateContainer>


        </Create>
        <GroupContainer onPress={() => navigation.push("Chat")}>
          <Text bold center color="#ffffff">
              Chat
          </Text>
        </GroupContainer>

        <GroupContainer onPress={RetriveGroupData}>
          <Text bold center color="#ffffff">
              Retrive Group
          </Text>
        </GroupContainer>

       <FlatList 
      
      
       /> 
      
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

const SignUp = styled.TouchableOpacity`
  margin-top: 10px; 
 
`; 

const ProfilePhotoContainer = styled.View`
  background-color: #e1e2e6;
  width: 100px; 
  height: 100px; 
  border-radius: 48px; 
  align-self: center; 
  margin-top: 16px;
  overflow: hidden; 
  margin-bottom: 32px;
`; 

const ProfilePhoto = styled.Image`
  width: 100px;
  height: 100px; 
  border-radius: 64px; 

`;

const GroupContainer = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 68px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
  margin-bottom: 32px;
`;


const CreateContainer = styled.TouchableOpacity`
  margin: 0 10px; 
  height: 70px; 
  width: 140px
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
  margin-bottom: 32px;
`;


const Create = styled.View`
flex-direction: row; 
align-items: center; 
justify-content: center; 
`;