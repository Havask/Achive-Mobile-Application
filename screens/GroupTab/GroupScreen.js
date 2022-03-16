import React, {useState, useContext} from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";

export default GroupScreen = ({navigation}) => {

  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 


  const JoinHandler = () => {

    //Send en bekreftelse til de som er i gruppen. Hvis de sier
    //ja så oppdateres databasen med navnet til han. 

    //De som eier gruppen må da godkjenne deg 

    //lag en flatlist som inneholder de gruppene du er med i

    // display også 

    //kanskje mekke notifications på de liste elementene

    // 
    
  }; 

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              Groups:
         </Text>
        </Main>

        <ProfilePhotoContainer>
          <ProfilePhoto 
            source={user.profilePhotoUrl == "default"
                    ? require("../../assets/logo.png")
                    : { uri: user.profilePhotoUrl}
            }
          />
        </ProfilePhotoContainer>

        <GroupContainer onPress={() => navigation.push("CreateGroup")}>
          <Text bold center color="#ffffff">
              Create new group
          </Text>
        </GroupContainer>

       <FlatList /> 

        <SignUp onPress={() => navigation.push("joingroup")}>
          <Text small center> 
              Join an existing group? <Text bold color="#88d498">Press here</Text>
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

const SignUp = styled.TouchableOpacity`
  margin-top: 100px; 
 
`; 

const ProfilePhotoContainer = styled.View`
  background-color: #e1e2e6;
  width: 100px; 
  height: 100px; 
  border-radius: 48px; 
  align-self: center; 
  margin-top: 16px;
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