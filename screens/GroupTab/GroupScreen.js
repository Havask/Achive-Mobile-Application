import React, {useState, useContext, useEffect} from "react";
import {FlatList} from 'react-native';
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons"; 
import {GroupContext} from "../../context/GroupContext";

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

/*
-Fix async av gruppene 
-Gjør ting mer arbitrært 
-Ordne opp i contexten til gruppene
-Få riktig farge på gruppene
*/

export default GroupScreen = ({navigation}) => {
  
  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  const [Groups, setGroups] = useState([]); 
  const [data, setData] = useState([]); 
  
  const [_, setGroup] = useContext(GroupContext); 

  const ChangeGroup = ( item ) => {
  
    try{
      
      setGroup({
        groupname: item.title, 
        color:  item.color, 
  
      })

      navigation.push("Tasks"); 

    }catch(error){
      alert("Unable to set up groupContext")
    }
  }
  useEffect(() => {
 
    GroupData();  
  }, []);

  const GroupData = async () => {

    try{
      
      /*
      AsyncStorage.removeItem('groups');
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
        else{
        */

        //henter ut hvilken grupper brukeren tilhører 
         const groups = await firebase.RetriveGroupData(); 
         const emailAsync = AsyncStorage.getItem('email');
          console.log("Email asynced: ",emailAsync)
        //henter ut info om de gruppene 
        const objectArray = await firebase.LoadGroups(groups); 
        //console.log("Group info:",objectArray); 

         const DATA = [
          {
            id: makeid(6),
            title: objectArray[0].groupname,
            color: objectArray[0].color, 
          },
          {
            id: makeid(6),
            title: objectArray[1].groupname,
            color: objectArray[1].color, 
          },
          {
            id: makeid(6),
            title: objectArray[2].groupname,
            color: objectArray[2].color, 
          },
        ];

        setData(DATA); 
        return DATA; 
         //Lagre den i async storage
         const jsonValue = JSON.stringify(objectArray)
         await AsyncStorage.setItem(
           'groups',
           jsonValue
           );
        
        }catch {
          console.log("Something went wrong @GroupData");
        }
      }

  const renderItem = ({ item }) => (
    <GroupView color={item.color} onPress={() => ChangeGroup(item)}>
      <Text bold center color="#ffffff">
              {item.title}
      </Text>
    </GroupView>
  );

  return(
    <Container>
       <Main>
        
         <Text title bold center color="#88d498">
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

const GroupView = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 68px; 
  align-items: center; 
  justify-content: center; 
  background-color: ${props => props.color};
  border-radius: 6px;
  margin-bottom: 32px;
`;



