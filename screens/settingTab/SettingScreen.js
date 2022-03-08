import React, {useState, useContext} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";

// Lag en nye stacks for alle settingsan
export default SettingScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 

  const [NewEmail, setNewEmail] = useState(); 
  const [NewPassword, setNewPassword] = useState(); 

  const signOut = async () => {

    setLoading(true);
    setUser({isLoggedIn: null}); 
  };

  const deleteUser = async () => {

    await firebase.DeleteUser()
    setUser({isLoggedIn: null}); 
  }; 

  const ResetPassword = async () => {

    const uid = await firebase.getCurrentUser().uid; 
    const userInfo = await firebase.getUserInfo(uid)
    await firebase.ResetPassword(userInfo.email); 
  }; 

  const UpdateUserEmail = async () => {

    await firebase.UpdateUserEmail(NewEmail); 

    setUser({
      email: NewEmail, 
    })
  }; 

  const updateUserPassword = async () => {
    await firebase.updateUserPassword(NewPassword); 
  }

  return(
    <Container>
       <Main>
         <Text title semi center color="#88d498">
              User settings:
         </Text>
        </Main>

        <SignUp onPress={signOut}>
          <Text small center> 
              <Text bold color="#88d498">Log Out</Text></Text>
        </SignUp>

        <SignUp onPress={deleteUser}>
          <Text small center> 
              <Text bold color="#88d498">Delete User</Text></Text>
        </SignUp>

        <SignUp onPress={ResetPassword}>
          <Text small center> 
              <Text bold color="#88d498">Reset Password</Text></Text>
        </SignUp>

        <SignUp onPress={UpdateUserEmail}>
          <Text small center> 
              <Text bold color="#88d498">Update Email</Text></Text>
        </SignUp>

        <SignUp onPress={updateUserPassword}>
          <Text small center> 
              <Text bold color="#88d498">Update password</Text></Text>
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