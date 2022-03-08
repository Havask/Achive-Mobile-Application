/*
TODO: 

-Finn en lønsning for å måle hvor mye som er gjort
-Lag en Scoreboard skjerm 
-Koble til en scoreboard docs til hver gruppe. 
-Der alle grupper starter med 0 i poeng til hver, 
-
*/

import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";

export default Scoreboard = ({navigation}) => {

    const firebase = useContext(FirebaseContext); 
    const [user, setUser] = useContext(UserContext); 
    
    return(
      <Container>
         <Main>
           <Text title semi center color="#88d498">
                Scoreboard screen:
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