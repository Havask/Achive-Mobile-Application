import {FlatList} from 'react-native';
import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import {FirebaseContext} from "../../../context/FirebaseContext";
import {UserContext} from "../../../context/UserContext";
import {GroupContext} from "../../../context/GroupContext";
import {Ionicons} from "@expo/vector-icons"; 
import {Flex,Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center, Image,Divider,Stack, Button} from "native-base";

import {
  RefreshControl
} from 'react-native';

export default GroupScreen = ({navigation}) => {

const firebase = useContext(FirebaseContext); 
const [user, setUser] = useContext(UserContext); 
const [Group, setGroup] = useContext(GroupContext); 
const [text, settext] = useState(true)

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

const ChangeGroup = ( item ) => {
  
  try{

    navigation.push("GroupFeeds"); 
  }catch(error){
    alert("Unable to set up groupContext")
  }
}

const DATA = [
  {
    id: makeid(6),
    title: "Posts",
    color: Group.color, 
  },
];

const renderitem = ({
  item
}) => 
    <Box maxW="100%">
    <VStack >
      <Divider />
        <Pressable onPress={() => ChangeGroup(item)} >
          <Box>
          <HStack space={2} w="100%" h="70" justifyContent="center" alignItems="center" bg="primary.50">
              <Text color="coolGray.800" bold fontSize="xl" >
                {item.title}
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

const RenderText = () => {
  if(text === true){
    return (
    <Pressable onPress={toggleSwitch}>
      <Stack alignItems="center">
        <Heading fontSize="3xl" color={Group.color}>
          {Group.groupname}
        </Heading>
      </Stack>
    </Pressable>
    )
  }else{
    return(
      <Pressable onPress={toggleSwitch}>
        <Stack alignItems="center">
          <Heading fontSize="3xl" color={Group.color}>
            {Group.groupID}
          </Heading>
        </Stack>
      </Pressable>
    )
  }
}

const toggleSwitch = () => settext(previousState => !previousState);

return(
  <Flex >
    <Box p="5">
      <RenderText/>
    </Box>
    
    <FlatList 
      data={DATA}
      renderItem={renderitem}
      keyExtractor={item => item.id}
      refreshControl={<RefreshControl />}
    /> 

    <Stack pb="5" alignItems="center" mb="2.5" mt="1.5">
      <Button  variant="link" onPress={() => navigation.push("AddTask")} height="50" width="150" leftIcon={<Icon as={Ionicons} name="create-outline" size="sm"  />}>
        Add more feature
      </Button>
    </Stack>
   </Flex>
  );
}

