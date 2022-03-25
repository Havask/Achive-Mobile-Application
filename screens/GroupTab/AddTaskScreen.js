import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {GroupContext} from "../../context/GroupContext";

export default AddTaskScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext); 
  const [Groupname, setGroupName] = useState(""); 
  const [Task, setTask] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [Group, setGroup] = useContext(GroupContext); 

  const AddtaskHandler = (enteredText) =>{

  };

  const CreateNewGroup = async () => {

    await firebase.CreateGroup(Groupname, Members); 
    navigation.push("Group"); 
  };

  return(
    <Container>
      <ScrollView>
      <KeyboardAvoidingView>
       <Main>
         <Text title semi center color={Group.color}>
              Add Task:
         </Text>
        </Main>

        <Auth>
          <AuthContainer>
            <AuthTitle>Task Name</AuthTitle>
            <AuthField 
              autocorrect={false} 
              onChangeText={AddtaskHandler}
              value={Task}
            />
          </AuthContainer>

        </Auth>
        
        <SignUpContainer onPress={CreateNewGroup} disable={loading} color={Group.color}>
          {loading ? (<Loading/>) : (
          <Text bold center color="#ffffff">
            Create Group</Text>
          )}
        </SignUpContainer>

        </KeyboardAvoidingView>
      </ScrollView>
     </Container>
    );
}

const Container = styled.KeyboardAvoidingView`
    flex: 1; 
`;

const Main = styled.View`
  margin-top: 80px; 
  margin-bottom: 50px; 
`;

const Auth = styled.View`
  margin: 16px 32px 32px; 
`; 

const AuthContainer = styled.View`
  margin-bottom: 32px;
`; 

const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 12px; 
  text-transform: uppercase; 
  font-weight: 300; 
`; 

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1; 
  border-bottom-width: 1px;
  height: 48px; 
`; 

const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 48px; 
  align-items: center; 
  justify-content: center; 
  background-color: ${props => props.color};
  border-radius: 6px;
`;

const SignUp = styled.TouchableOpacity`
  margin-top: 16px; 
`; 

const Loading = styled.ActivityIndicator.attrs(props => ({
  color: "#fffffff",
  size: "small", 
}))``; 

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: #e1e2e6;
  width: 80px; 
  height: 80px; 
  border-radius: 40px; 
  align-self: center; 
  margin-top: 16px;
  overflow: hidden; 
`; 

const DefaultProfilePhoto = styled.View`
  align-items: center; 
  justify-content: center; 
  flex: 1; 
`; 

const ProfilePhoto = styled.Image`
  flex: 1; 
`;