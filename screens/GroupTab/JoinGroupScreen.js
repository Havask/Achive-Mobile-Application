import React, {useState} from "react"; 
import {Button} from "react-native"; 
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";

export default JoinGroup = ({navigation}) => {
    const [enteredCode, setEnteredCode] = useState(""); 

    const CodeInputHandler = (enteredText) =>{
        setEnteredCode(enteredText)
    };

    const JoinHandler = () => {
        //Search the code in the database and add this user to the group
        () => navigation.push("groups")
    }; 

    return(
            <Container>
                <Main>
                    <Text title semi center color="#88d498">
                        Enter code to join
                    </Text>
                </Main>
                <Input 
                    placeholder = "Code" 
                    maxLength = {5}
                    textAlign="center"
                    onChangeText = {CodeInputHandler}
                    value={enteredCode}
                />
                <Row>
                    <ButtonView>
                        <Button title = "Cancel" color = "red" onPress={() => navigation.push("group")}/>
                    </ButtonView>
                    <ButtonView>
                        <Button title = "Join" onPress={JoinHandler}/>
                    </ButtonView>
                </Row>

                <SignUp onPress={() => navigation.push("Scanner")}>
                    <Text small center> 
                        Got a QR code? <Text bold color="#88d498">Scan here</Text></Text>
                </SignUp>
            </Container>
    ); 
};

const SignUp = styled.TouchableOpacity`
  margin-top: 16px; 
`; 


const Container = styled.View`
    margin-top: 60px; 
   flex: 1; 

`;

const Row = styled.View`
   flex-direction: row;

`;

const ButtonView = styled.View`
    margin: 0px 110px 0px 45px; 
`;

const Input = styled.TextInput`
    border-bottom-color: #8e93a1; 
    border-bottom-width: 1px;
    height: 68px; 
    margin: 16px 32px 32px; 
`; 
const Main = styled.View`
    margin: 16px 32px 32px; 
    margin-top: 80px; 
    margin-bottom: 50px; 
    align-items: center; 
    justify-content: center; 
`;


