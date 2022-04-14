import React, {useState, useContext, useEffect} from "react";
import {FlatList} from 'react-native';
import styled from "styled-components/native"; 
import Text1 from "../../components/Text.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons"; 
import {GroupContext} from "../../context/GroupContext";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import * as SecureStore from 'expo-secure-store';

import { NativeBaseProvider, Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center } from "native-base";


import {
  RefreshControl, Vibration
} from 'react-native';
/*
groups can have events

*/
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

export default GroupScreen = ({navigation}) => {
  
  const [profilePhoto, setProfilePhoto] = useState(); 
  const [Groups, setGroups] = useState([]); 
  const [data, setData] = useState([]); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  const [_, setGroup] = useContext(GroupContext); 

  useEffect(() => {
    
    const jsonValue = JSON.stringify(user)
    SecureStore.setItemAsync("User", jsonValue);

    GroupData();  
  }, []);

  const ChangeGroup = ( item ) => {
  
    try{
      setGroup({
        groupname: item.groupname, 
        groupID: item.groupID, 
        color:  item.color, 
        members: item.members, 
        profilePhotoUrl: item.profilePhoto,
      })

      //Dette blir også gjort til item.groupthingy ettervært
      navigation.push("Tasks"); 
    }catch(error){
      alert("Unable to set up groupContext")
    }
  }

  const GroupData = async () => {
    try{
      const value = await AsyncStorage.getItem("groups");

      if (value !== null) {

        // Hent ut data fra async storage
        const parsedJson = JSON.parse(value)
        setData(parsedJson); 

      }else{
        //henter ut hvilken grupper brukeren tilhører 
        const groups = await firebase.RetriveGroupData(); 
        //returnerer et array av json objekter
        const objectArray = await firebase.LoadGroups(groups); 
        setData(objectArray); 
       
         const jsonValue = JSON.stringify(objectArray)
         await AsyncStorage.setItem(
           "groups",
           jsonValue
          );
        }
      }catch {
        console.log("Something went wrong @GroupData");
      }
    }

  const renderItem = ({ item }) => (
    <GroupView color={item.color} onPress={() => ChangeGroup(item)}>
      <Text1 bold center color="#ffffff">
              {item.groupname}
      </Text1>
    </GroupView>
  );

  const renderItem1 = ({
    item,
    index
  }) => <Box>
      <Pressable onPress={() => console.log("You touched me")} _dark={{
      bg: "coolGray.800"
    }} _light={{
      bg: "white"
    }}>
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} bold>
                {item.groupname}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>;


  return(
    <Container>
       <Main>
        
          <IconsView>
          <ProfilePhotoContainer onPress={() => navigation.push("drawer")}>
            <ProfilePhoto 
              source={user.profilePhotoUrl == "default"
                      ? require("../../assets/logo.png")
                      : { uri: user.profilePhotoUrl}
              }
            />
          </ProfilePhotoContainer>
            <Notification onPress={() => navigation.push("Explore")}>
              <Ionicons 
                    name={"ios-compass-outline"} 
                    size={50} 
                    color={"#88d498"}
                    
              />
            </Notification>
          </IconsView>
        </Main>
          
        <Create>
          <CreateContainer onPress={() => navigation.push("CreateGroup")}>
            <Text1 bold center color="#ffffff">
                Create
            </Text1>
          </CreateContainer>

          <CreateContainer onPress={() => navigation.push("joingroup")}>
            <Text1 bold center color="#ffffff">
                Join
            </Text1>
          </CreateContainer>
        </Create>
    
       <FlatList 
            data={data}
            renderItem={renderItem1}
            keyExtractor={item => item.groupID}
            refreshControl={<RefreshControl />}
       /> 
     </Container>
    );
}

const Container = styled.View`
    flex: 1; 
`;


const Main = styled.View`
  margin-top: 30px; 
  align-items: center; 
  justify-content: center; 
`;

const IconsView = styled.View`
  flex-direction: row; 
  
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 50px; 
  height: 50px; 
  border-radius: 48px; 
  align-self: center; 
  overflow: hidden; 
  margin-bottom: 32px;
`; 

const ProfilePhoto = styled.Image`
  width: 50px;
  height: 50px; 
  border-radius: 64px; 
`;

const CreateContainer = styled.TouchableOpacity`
  margin: 0 10px; 
  height: 60px; 
  width: 140px
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 20px;
  margin-bottom: 32px;
`;

const Create = styled.View`
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
 
`;

const Notification = styled.TouchableOpacity`
  margin: 0px 0px 0px 190px; 
  height: 50px; 
  width: 50px
  align-items: center; 
  justify-content: center; 
  border-radius: 6px;
`;

const Reload = styled.TouchableOpacity`
  height: 50px; 
  width: 50px
  align-items: center; 
  justify-content: center; 
  border-radius: 6px;
`;

const GroupView = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 68px; 
  align-items: center; 
  justify-content: center; 
  background-color: ${props => props.color};
  border-radius: 6px;
  margin-bottom: 16px;
`;



