/*
TODO: 

-Finn en lønsning for å måle hvor mye som er gjort
-Lag en Scoreboard skjerm 
-Koble til en scoreboard docs til hver gruppe. 
-Der alle grupper starter med 0 i poeng til hver, 
- 

Lag en top 3 palle for måneden
*/

import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../../components/Text.js";
import {FirebaseContext} from "../../../context/FirebaseContext";
import {UserContext} from "../../../context/UserContext";
import {GroupContext} from "../../../context/GroupContext";
import {FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons"; 

export default Scoreboard = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  const [Group, setGroup] = useContext(GroupContext); 
  
  const DATA = [
    {
      id: 1,
      title: "Håvard",
      color: Group.color, 
    },
    {
      id: 2,
      title: "Synnøve",
      color: Group.color, 
    },
    {
      id: 3,
      title: "Vilde",
      color: Group.color, 
    },
    {
      id: 4,
      title: "Kåre",
      color: Group.color,  
    },
    {
      id: 5,
      title: "Vegard",
      color: Group.color, 
    },
    {
      id: 6,
      title: "Marius",
      color: Group.color, 
    },
  ];


    const renderMembers = ({ item }) => (
      <GroupView color={Group.color}>
          <Ionicons 
                  name={"ios-notifications-outline"} 
                  size={30} 
                  color={"#88d498"}
            />
        <Text bold center color="#ffffff">
                {item.title}
        </Text>
      </GroupView>
    );

    return(
      <Container>
         <Main>
           <Text title semi center color={Group.color}>
                Scoreboard screen:
           </Text>
          </Main>
    
          <FlatList 
            data={DATA}
            renderItem={renderMembers}
            keyExtractor={item => item.id}
       /> 
       </Container>
      );
    }


  const Container = styled.View`
    flex: 1; 
  `;

  const GroupView = styled.TouchableOpacity`
    flex-direction: row; 
    margin: 0 32px; 
    height: 68px; 
    align-items: center; 
    justify-content: center; 
    background-color: ${props => props.color};
    border-radius: 6px;
    margin-bottom: 32px;
  `;

  const Main = styled.View`
    margin-top: 80px; 
    margin-bottom: 50px; 
    align-items: center; 
    justify-content: center; 
  `;
