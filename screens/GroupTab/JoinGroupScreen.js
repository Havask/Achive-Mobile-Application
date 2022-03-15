import React, {useState} from "react"; 
import {Button} from "react-native"; 
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import { Camera } from 'expo-camera';


const JoinGroup = props => {

    const [enteredCode, setEnteredCode] = useState(""); 

    const CodeInputHandler = (enteredText) =>{
        setEnteredCode(enteredText)
    };

    const UseCodeHandler = () => {
        
    }

    const startCamera = async () => {
        
        }

    return(
        <Modal visible ={props.visible} animationType="slide">
            <Container>
            <Main>
                <Text title semi center color="#88d498">
                    Enter code to join
                </Text>
            </Main>
                <Input 
                    placeholder = "Code" 
                    onChangeText = {CodeInputHandler}
                    value={enteredCode}
                />
                <ButtonView>
                    <Button title = "Join" onPress={UseCodeHandler}/>
                </ButtonView>
                <ButtonView>
                    <Button title = "Cancel" color = "red" onPress={props.onCancel}/>
                </ButtonView>

                <SignUp onPress={() => props.navigation.push("Camera")}>
                    <Text small center> 
                        Got a QR code? <Text bold color="#88d498">Scan here</Text></Text>
                </SignUp>
            </Container>
        </Modal>
    ); 
};
const SignUp = styled.TouchableOpacity`
  margin-top: 16px; 
`; 

const Modal = styled.Modal`
    
`;

const Container = styled.View`
   flex: 1; 

`;

const ButtonView = styled.View`
    margin: 16px 32px; 
`;

const Input = styled.TextInput`
  border-bottom-color: #8e93a1; 
  border-bottom-width: 1px;
  height: 48px; 
  margin: 16px 32px 32px; 
`; 
const Main = styled.View`
    margin: 16px 32px 32px; 
    margin-top: 80px; 
    margin-bottom: 50px; 
    align-items: center; 
    justify-content: center; 
`;

export default JoinGroup; 

