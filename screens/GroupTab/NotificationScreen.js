
import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {GroupContext} from "../../context/GroupContext";
import {FlatList} from 'react-native';

export default NotificationScreen = ({navigation}) => {

    const firebase = useContext(FirebaseContext); 
    const [user, setUser] = useContext(UserContext); 
    const [Group, setGroup] = useContext(GroupContext); 

    const renderMembers = ({ item }) => (
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
                Scoreboard screen:
           </Text>
          </Main>
    
          <FlatList 
            data={data}
            renderItem={renderMembers}
            keyExtractor={item => item.id}
       /> 
       </Container>
      );
    }
    const Container = styled.View`
    flex: 1; 
`;