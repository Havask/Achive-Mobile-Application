import React, {useState, useContext, useEffect} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import {GroupContext} from "../../context/GroupContext";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import * as SecureStore from 'expo-secure-store';
import { SwipeListView } from "react-native-swipe-list-view";

import {Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center, Image,Divider,Stack, Button} from "native-base";
import {RefreshControl, Vibration} from 'react-native';


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

    await firebase.CacheUserContext(user); 

    //Returnerer en nylig liste over hvilke grupper man tilhører 
    const groups = await firebase.RetriveGroupData(); 
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
        <Box maxW="100%">
        <VStack >
          <Divider />
          <Pressable onPress={() => ChangeGroup({item})} >
            <Box>
            <HStack w="100%" h="70" justifyContent="space-between" alignItems="center" bg="primary.50">
              
            <Image source={group.GroupPhotoUrl == "default"
                        ? require("../../assets/default-group.png")
                        : { uri: item.GroupPhotoUrl}
                } height="60" rounded="full" width="60" alt="GroupPhoto"  />
                <Text color="coolGray.800" bold fontSize="xl" >
                  {item.groupname}
                </Text>
                <Ionicons 
                    name={"chevron-forward-outline"} 
                    size={30} />
              </HStack>
            </Box>
          </Pressable>
          <Divider />
          </VStack>
      </Box>;

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
  <HStack flex="1" pl="2" alignItems="center">
    <Pressable w="100" h="60" bg="red.500" justifyContent="center"  ml="auto" 
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
    <Box>
      <HStack space={12} justifyContent="center" pt="7">
          <Box w="100" h="100">
            <Button onPress={() => navigation.push("CreateGroup")} height="50" width="110" leftIcon={<Icon as={Ionicons} name="create-outline" size="sm"  />}>
              Create
            </Button>
          </Box>
          <Box>
            <Button onPress={() => navigation.push("joingroup")} height="50" width="110" leftIcon={<Icon as={Ionicons} name="log-in-outline" size="sm"  />}>
              Join
            </Button>
          </Box>
      </HStack>
      <Box>
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
      </Box>
    </Box>
  );
}
