/* 

-Søking opp av grupper 
-Må displeye foreslag
-Kan man lage en algoritme som ser på gruppene 
 Man er med i og foreslår noe? 

*/ 

import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import { KeyboardAvoidingView, ScrollView, } from "react-native";
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

  const Groups = [
    {
      id: "1223434",
      group: "Håvards Gruppe"
    },
    {
      id: "12234134",
      group: "Synnøves Gruppe"
    },
    {
      id: "12234341",
      group: "Siverts Gruppe"
    },
    {
      id: "122342341",
      group: "Gruppe"
    },
    {
      id: "12234341",
      group: "Håvards Gruppe"
    },
    {
      id: "122314134",
      group: "Synnøves Gruppe"
    },
    {
      id: "112234341",
      group: "Siverts Gruppe"
    },
    {
      id: "1223423411",
      group: "Gruppe"
    },
    {
      id: "1223434",
      group: "Håvards Gruppe"
    },
    {
      id: "122341134",
      group: "Synnøves Gruppe"
    },
    {
      id: "112234341",
      group: "Siverts Gruppe"
    },
    {
      id: "1223423421",
      group: "Gruppe"
    },
    {
      id: "122343341",
      group: "Håvards Gruppe"
    },
    {
      id: "1223144134",
      group: "Synnøves Gruppe"
    },
    {
      id: "1122345341",
      group: "Siverts Gruppe"
    },
    {
      id: "12234236411",
      group: "Gruppe"
    },
  ]
  
  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext); 
  const [Group, setGroup] = useContext(GroupContext); 
  const [GroupName, setGroupName] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const RenderGroups = ({item}) =>(

    <Box maxW="40" maxH="40" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="5" >
      <Pressable _pressed={{
      bg: "muted.400"
    }} >
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
            {item.group}
            </Heading>
          </Stack>
        </Stack>
        </Pressable>
      </Box>
  
  )

  const SearchHandler = () => {
//queryes the database for groups to join
}; 

const RetriveGroups = () => {
  //Hent ut forslag til grupper 
  return; 
}

  return(
    <Container>
  
      <VStack my="4" space={5} w="100%" maxW="300px" alignSelf="center">
        <VStack w="100%" space={5} alignSelf="center">
          <Heading alignSelf="center" fontSize="lg"> Find your community: </Heading>
          <Input placeholder="Search for groups" width="100%" borderRadius="4" py="3" px="1" fontSize="14" 
          InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
        </VStack>
      </VStack>

      <Feed 
        contentContainerStyle={{alignSelf: 'center'}}
        numColumns={2}
        data={Groups} 
        renderItem={RenderGroups} 
        keyExtractor={item => item.id.toString()} 
        refreshControl={<RefreshControl/>}
      />

     </Container>
    );
}

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
  height: 48px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498; 
  border-radius: 6px;
  margin-bottom: 50px; 
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

const Feed = styled.FlatList`

`;