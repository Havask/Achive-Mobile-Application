import React, {useState, useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import {GroupContext} from "../../context/GroupContext";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import * as SecureStore from 'expo-secure-store';
import { SwipeListView } from "react-native-swipe-list-view";
import {Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center, Image,Divider,Stack, Button} from "native-base";
import {RefreshControl} from 'react-native';

export default HomeScreen = ({navigation}) => {
  
  const [Groups, setGroups] = useState([]); 
  const [data, setData] = useState([]); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  const [group, setGroup] = useContext(GroupContext); 

  useEffect(() => {
    let isMounted = true; 
    if(isMounted === true){
      RefreshGroupData();  
    }
    return () => { isMounted = false };
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

  //Henter enten ut fra persistent storage eller så hentes det fra databasen og lagres der
  const RefreshGroupData = async () => {
 
    try{

      /*
        -Når en gruppe lages
        -Når en gruppe slettes 
        -Når en gruppe joines 

        Default === persistent storage
      */
     
      firebase.CacheUserContext(user); 

      const value = await AsyncStorage.getItem("groups");

      if (value !== null) {

        //Hent ut data fra async storage
        const parsedJson = JSON.parse(value)
        console.log("Cached Groups: ", parsedJson)
        setData(parsedJson); 

        const groups = await firebase.RetriveGroupData(); 
        //updates the user context with the groups
        setUser((state) => ({ ...state, groups: groups})); 

      }else{
       console.log("Nothing was no groups in persistent storage") 
      }
      }catch {  
        console.log("Something went wrong @GroupData");
    }
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
                <Text bold fontSize="xl" >
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
  firebase.RemoveCacheGroupData(groupID)
  closeRow(rowMap, rowKey);
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
      <HStack space={12} justifyContent="center" pt="10" >
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
