import React, {useState, useContext} from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons"
import AsyncStorageAdapter from '../../context/LocalStorageContext';
const { getData, storeData, storeMultipleData,
  getMultipleData, getAllData, removeData, removeMultipleData,
  getAllKeys, clearAll} = new AsyncStorageAdapter("@Achive");

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


    //lag også en bell icon på toppen av høyresiden til groups
    //lag en notification screen
  }

  const GroupData = async () => {
    try{
      if(getData("groups") === false){
        
        const groups = await firebase.RetriveGroupData(); 
        console.log("Array of groups", groups)
  
        const objectArray = await firebase.LoadGroups(groups); 
        console.log("Array of groups", objectArray[0])
        const jsonValue = JSON.stringify(objectArray)
        storeData("groups", jsonValue); 
      }else{
        console.log("Did not enter if")
      }
    }catch {
      console.log("Could not Load data")
    }
  }

  return(
    <Container>
       <Main>
        
         <Text title semi center color="#88d498">
              Groups:
         </Text>
    
        <Notification>
            <Ionicons 
                  name={"ios-notifications-outline"} 
                  size={30} 
                  color={"#88d498"}
            />
        </Notification>
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

        <GroupContainer onPress={GroupData}>
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
  align-items: center; 
  justify-content: center; 

`;

const ProfilePhotoContainer = styled.View`
  background-color: #e1e2e6;
  width: 100px; 
  height: 100px; 
  border-radius: 48px; 
  align-self: center; 
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

const Notification = styled.TouchableOpacity`
  margin: 0 10px 0 290px; 
  height: 50px; 
  width: 50px
  align-items: center; 
  justify-content: center; 
  border-radius: 6px;
`;