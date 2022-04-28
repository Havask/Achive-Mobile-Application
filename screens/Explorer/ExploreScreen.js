/* 

-Søking opp av grupper 
-Må displeye foreslag
-Kan man lage en algoritme som ser på gruppene 
 Man er med i og foreslår noe? 

*/ 

import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import { FlatList } from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {GroupContext} from "../../context/GroupContext";

import {
  RefreshControl, Vibration
} from 'react-native';

import { VStack, Input, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, Divider, Heading,Stack,Pressable, AspectRatio,  Image} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default ExplorerScreen = ({navigation}) => {
  
  const firebase = useContext(FirebaseContext); 
  const [User, setUser] = useContext(UserContext); 
  const [Group, setGroup] = useContext(GroupContext); 
  const [Suggestion, setSuggestion] = useState(); 
  const [GroupName, setGroupName] = useState(""); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    RetriveGroups();  
  }, []);

  const SearchHandler = () => {
//queryes the database for groups to join

}; 

const JoinGroup = (groupID) => {
    //queryes the database for groups to join
    firebase.JoinGroup(groupID)
  }; 

const RetriveGroups = async () => {
  try{
    const Sug = await firebase.ExplorationFeed()
    console.log("sug",Sug)
    setSuggestion(Sug); 

    }catch(error){
      console.log("Error @RetriveGroups", error)
    }
}
  const RenderGroups = ({item}) =>(

    <Box w="200" h="200" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="5" >
      <Pressable _pressed={{bg: "muted.400"}} onPress={JoinGroup(item.groupID)}>
        <Box w="100%">
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
              uri: "https://picsum.photos/200/300"
            }} alt="image" />
            </AspectRatio>
        </Box>

        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
            {item.groupname}
            </Heading>
          </Stack>
        </Stack>
        </Pressable>
      </Box>
  )

  return(
    <Box>

      <VStack my="4" space={5} w="100%" maxW="300px" alignSelf="center" pt="10">
        <VStack w="100%" space={5} alignSelf="center">
          <Heading alignSelf="center" fontSize="lg"> Find your community: </Heading>
          <Input placeholder="Search for groups" width="100%" borderRadius="4" py="3" px="1" fontSize="14" 
          InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
        </VStack>
      </VStack>

      <FlatList 
        contentContainerStyle={{alignSelf: 'center'}}
        numColumns={2}
        data={Suggestion} 
        renderItem={RenderGroups} 
        keyExtractor={item => item.groupID.toString()} 
        refreshControl={<RefreshControl onRefresh={RetriveGroups} />}
      />
    </Box>
  );
}

