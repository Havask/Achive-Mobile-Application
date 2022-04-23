/*
TODO: 

-Finn en måte å rullere på rutinene

*/

import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../../components/Text.js";
import {FirebaseContext} from "../../../context/FirebaseContext";
import {UserContext} from "../../../context/UserContext";

export default RoutineScreen = ({navigation}) => {

    const firebase = useContext(FirebaseContext); 
    const [user, setUser] = useContext(UserContext); 
    
    
    return(
      <Container>
         <Main>
           <Text title semi center color="#88d498">
                Routines screen:
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