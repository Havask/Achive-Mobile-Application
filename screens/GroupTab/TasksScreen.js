/*
TODO: 

-For hver gruppe har diverse tasks, ruiner, todos osv. 
-Hvilken funksjoner skal en gruppe kunne bruke? 
-

*/

import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";


export default TasksScreen = ({navigation}) => {

const firebase = useContext(FirebaseContext); 
const [user, setUser] = useContext(UserContext); 


return(
  <Container>
     <Main>
       <Text title semi center color="#88d498">
            Tasks screen:
       </Text>
      </Main>

      <SignUp>
        <Text small center> 
          <Text bold color="#88d498">Task</Text>
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