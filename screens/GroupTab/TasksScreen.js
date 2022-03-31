import {FlatList} from 'react-native';
import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {GroupContext} from "../../context/GroupContext";
import {Ionicons} from "@expo/vector-icons"; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

/* 
Lag en egen knapp for QR koden. La de enkelt screene og dele den 
-Lag sånn at man kan legge til de tingan man ønske fra pluss knappen
*/

export default TasksScreen = ({navigation}) => {

const firebase = useContext(FirebaseContext); 
const [user, setUser] = useContext(UserContext); 
const [Group, setGroup] = useContext(GroupContext); 
//få også inn gruppekonteksten 


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
  {
    id: makeid(6),
    title: "Rutiner",
    color: Group.color, 
  },
  {
    id: makeid(6),
    title: "Oppgaver",
    color: Group.color, 
  },
];

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
       <Text title semi center color={Group.color}>
          {Group.groupname}
       </Text>
      </Main>
      <IconsView>
        <Notification onPress={() => navigation.push("Scoreboard")}>
        <MaterialCommunityIcons 
          name="podium-gold" 
          size={50} 
          color={Group.color} />
        </Notification>

        <Notification onPress={() => navigation.push("Chat")}>
          <Ionicons 
            name={"ios-chatbubbles-outline"} 
            size={50} 
            color={Group.color}
          />
        </Notification>
      </IconsView>
      <FlatList 
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
       /> 
        <SignUp color={Group.color} onPress={() => navigation.push(item.title)}>
          <Text title center> 
            <Text title bold color="#ffffff">+</Text>
          </Text>
        </SignUp>
   </Container>
  );
}

const Container = styled.View`
  flex: 1; 
`;

const Main = styled.View`
margin-top: 80px; 
margin-bottom: 50px; 
`;

const Notification = styled.TouchableOpacity`
  margin: 0px 200px 0px 20px; 
  height: 50px; 
  width: 50px
  align-items: center; 
  justify-content: center; 
  border-radius: 6px;
`;

const IconsView = styled.View`
  flex-direction: row; 
  margin-bottom: 60px; 
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

const SignUp = styled.TouchableOpacity`
  margin: 0 150px; 
  width: 80px; 
  height: 80px; 
  align-items: center; 
  justify-content: center; 
  background-color: ${props => props.color};
  border-radius: 50px;
  margin-bottom: 32px;
`; 