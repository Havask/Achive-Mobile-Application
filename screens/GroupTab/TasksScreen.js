/*
TODO: 

-For hver gruppe har diverse tasks, ruiner, todos osv. 
-Hvilken funksjoner skal en gruppe kunne bruke? 
-

Todo: 
-Chattefunksjon 
-Scoreboard
-Diplay gruppenavnet øverst 
-Mulighet for å lage nye rutiner/grupper/todos
-

*/

import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {Ionicons} from "@expo/vector-icons"; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



export default TasksScreen = ({navigation}) => {

const firebase = useContext(FirebaseContext); 
const [user, setUser] = useContext(UserContext); 
//få også inn gruppekonteksten 

return(
  <Container>
     <Main>


       <Text title semi center color="#88d498">
            Tasks screen:
       </Text>
      </Main>
      <IconsView>
        <Notification onPress={() => navigation.push("Scoreboard")}>
        <MaterialCommunityIcons 
          name="podium-gold" 
          size={50} 
          color="black" />
        </Notification>

        <Notification onPress={() => navigation.push("Chat")}>
              <Ionicons 
                    name={"ios-chatbubbles-outline"} 
                    size={50} 
                    color={"#88d498"}
              />
        </Notification>


      </IconsView>


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

const GroupContainer = styled.TouchableOpacity`
margin: 0 32px; 
height: 48px; 
align-items: center; 
justify-content: center; 
background-color: #88d498;
border-radius: 6px;
`;

const SignUp = styled.TouchableOpacity`
margin-top: 16px; 
`; 

const ProfilePhotoContainer = styled.TouchableOpacity`
background-color: #e1e2e6;
width: 80px; 
height: 80px; 
border-radius: 40px; 
align-self: center; 
margin-top: 16px;
overflow: hidden; 
`; 

const ProfilePhoto = styled.Image`
width: 128px;
height: 128px; 
border-radius: 64px; 
`;

const Notification = styled.TouchableOpacity`
  margin: 0px 210px 0px 0px; 
  height: 50px; 
  width: 50px
  align-items: center; 
  justify-content: center; 
  border-radius: 6px;
`;

const IconsView = styled.View`
  flex-direction: row; 
  
`;