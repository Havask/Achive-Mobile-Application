import React, {useState, useContext} from "react";
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar } from 'react-native';
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons"; 
import LottieView from "lottie-react-native";


//legg til en refresh knapp for gruppan

const renderItem = ({ item }) => (
  
  <GroupContainer >
    <Text bold center color="#ffffff">
      {item}
    </Text>
  </GroupContainer>
);

export default GroupScreen = ({navigation}) => {
  
  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  
  const [Groups, setGroups] = useState([]); 
  const [data, setData] = useState([]); 
  

  const GroupData = async () => {
    try{

      const value = await AsyncStorage.getItem('groups');

      if (value !== null) {
        // We have data!!
        const parsedJson = JSON.parse(value)
        const firstArray = parsedJson[0]; 
        const SecondArray = parsedJson[1]; 
        
        console.log("groupname",SecondArray)
        const DATA = [
          {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: firstArray.groupname,
            color: firstArray.color, 
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: SecondArray.groupname,
            color: SecondArray.color, 
          },
        ];

        setData(DATA); 
        return DATA; 
      }
      else{
        const groups = await firebase.RetriveGroupData(); 
        const objectArray = await firebase.LoadGroups(groups); 

        const firstArray = objectArray[0]; 
        const SecondArray = objectArray[1]; 

        console.log(firstArray); 

        

        const jsonValue = JSON.stringify(objectArray)
        await AsyncStorage.setItem(
          'groups',
          jsonValue
        );
      }
    }catch {
      console.log("Something went wrong @GroupData");
    }
  }

  const renderItem = ({ item }) => (
    <GroupView color={item.color}>
      <Text bold center color="#ffffff">
              {item.title}
      </Text>
    </GroupView>
  );

  return(
    <Container>
       <Main>
        
         <Text title semi center color="#88d498">
              Groups:
         </Text>
        <IconsView>
          <Notification>
            <Ionicons 
                  name={"ios-notifications-outline"} 
                  size={30} 
                  color={"#88d498"}
            />
          </Notification>
          <Reload onPress={GroupData}>
              <Ionicons 
                name={"ios-reload"} 
                size={30} 
                color={"#88d498"}
                  />
          </Reload>
        </IconsView>

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
              Create
          </Text>
        </CreateContainer>

        <CreateContainer onPress={() => navigation.push("joingroup")}>
          <Text bold center color="#ffffff">
              Join
          </Text>
        </CreateContainer>

        </Create>
        <GroupContainer onPress={() => navigation.push("Chat")}>
          <Text bold center color="#ffffff">
              Chat
          </Text>
        </GroupContainer>
       <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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

const IconsView = styled.View`
  flex-direction: row; 
  
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
  margin: 0px 210px 0px 0px; 
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

const GroupView = styled.View`
  margin: 0 32px; 
  height: 68px; 
  align-items: center; 
  justify-content: center; 
  background-color: ${props => props.color};
  border-radius: 6px;
  margin-bottom: 32px;
`;

const ListItem = styled.TouchableOpacity`
  margin: 0 10px 0 290px; 
  height: 50px; 
  width: 50px
  align-items: center; 
  justify-content: center; 
  border-radius: 6px;
`;

