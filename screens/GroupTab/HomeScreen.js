import React, {useState, useContext, useEffect} from "react";

import styled from "styled-components/native"; 
import Text1 from "../../components/Text.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import {GroupContext} from "../../context/GroupContext";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import * as SecureStore from 'expo-secure-store';
import { SwipeListView } from "react-native-swipe-list-view";

import {Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center, Image,Divider } from "native-base";
import {
  RefreshControl, Vibration
} from 'react-native';


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

export default HomeScreen = ({navigation}) => {
  
  const [profilePhoto, setProfilePhoto] = useState(); 
  const [Groups, setGroups] = useState([]); 
  const [data, setData] = useState([]); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  const [group, setGroup] = useContext(GroupContext); 

  useEffect(() => {
    GroupData();  
  }, []);

  const ChangeGroup = ( {item} ) => {
  
    try{

      setGroup({
        groupname: item.groupname, 
        groupID: item.groupID, 
        color:  item.color, 
        members: item.members, 
        GroupPhotoUrl: item.GroupPhotoUrl,
      })

      navigation.push("Groups"); 

    }catch(error){
      alert("Unable to set up groupContext")
    }
  }

  const GroupData = async () => {

    const Userjson = JSON.stringify(user)
    SecureStore.setItemAsync("User", Userjson);

    try{
      
      const value = await AsyncStorage.getItem("groups");

      if (value !== null) {

        //Hent ut data fra async storage
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

  const RefreshGroupData = async () => {

     console.log("User: ",user)
     // User context needs to update when creating new group

    //Returnerer en nylig liste over hvilke grupper man tilhører 
    const groups = await firebase.RetriveGroupData(); 

    console.log("",groups)
    //returnerer et array av json objekter
    const objectArray = await firebase.LoadGroups(groups); 

    setData(objectArray); 

    //updates the context 
    setUser((state) => ({ ...state, groups: groups})); 

    const jsonValue = JSON.stringify(objectArray)
    await AsyncStorage.setItem(
      "groups",
      jsonValue
    );
  }

  const renderItem = ({
    item
  }) => 
        <Pressable onPress={() => ChangeGroup({item})}  _pressed={{bg: "muted.400"}} >
          <Box>
            <HStack alignItems="center"  bg="primary.50" >
            <Image source={group.GroupPhotoUrl == "default"
                        ? require("../../assets/default-group.png")
                        : { uri: group.GroupPhotoUrl}
              
                } height="81" rounded="full" width="81" alt="GroupPhoto"  />
              <VStack>
                <Text color="coolGray.800" fontSize="2xl" bold>
                  {item.groupname}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        </Pressable>;

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

const deleteGroup = (rowMap, rowKey, groupID) => {
  firebase.LeaveGroup(groupID); 
  closeRow(rowMap, rowKey);

  /*

  Lager nytt arra
  const newData = [...listData];
  const prevIndex = listData.findIndex(item => item.key === rowKey);
  newData.splice(prevIndex, 1);
  setListData(newData); 
  
  */
};

const renderHiddenItem = (data, rowMap) => 
  <HStack flex="1" pl="2">
    <Pressable w="100" h="79" bg="red.500" justifyContent="center"  ml="auto" 
      onPress={() => deleteGroup(rowMap, data.item.key, data.item.groupID)} _pressed={{opacity: 0.5}}>
      <VStack alignItems="center" space={2}>
        <Icon as={<MaterialIcons name="delete" />} color="white" size="6" />
        <Text color="white" fontSize="xs" fontWeight="medium">
          Leave group
        </Text>
      </VStack>
    </Pressable>
  </HStack>;

  return(
    <Container>
       <Main>
          <IconsView>
          <ProfilePhotoContainer>
            <ProfilePhoto 
              source={user.profilePhotoUrl == "default"
                      ? require("../../assets/default-profile.png")
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
    
       <SwipeListView  
       useFlatList={true}
            renderHiddenItem={renderHiddenItem} 
            rightOpenValue={-100}
            leftOpenValue={10000}
            previewRowKey={"0"} 
            previewOpenValue={-50} 
            previewOpenDelay={3000} 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.groupID}
            refreshControl={<RefreshControl onRefresh={RefreshGroupData}/>}
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



