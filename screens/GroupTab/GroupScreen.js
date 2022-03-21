import React, {useState, useContext} from "react";
import { FlatList } from "react-native-gesture-handler";
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default GroupScreen = ({navigation}) => {

  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 

  const [Groups, setGroups] = useState([]); 



  const DisplayGroups = () => {

  }

  //ta navnet til gruppa ut av og sett det inn i et array

  const GroupData = async () => {
    try{

      const value = await AsyncStorage.getItem('groups');

      if (value !== null) {
        // We have data!!
        const parsedJson = JSON.parse(value)
        console.log("groupname",parsedJson)
        const firstArray = parsedJson[0]; 
        const SecondArray = parsedJson[1]; 
        
        const array = [firstArray.groupname, SecondArray.groupname]
        console.log("groupname",array)
        return array; 
      }
      else{
        const groups = await firebase.RetriveGroupData(); 
        const objectArray = await firebase.LoadGroups(groups); 
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
              Load Groups
          </Text>
        </GroupContainer>

       <FlatList 
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.groupID}
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

const Item = styled.View`

`;