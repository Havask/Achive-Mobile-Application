import React from "react"; 
import styled from "styled-components/native"; 
import Text from "../components/Text";

const MemberItem = props => {

    return (
    <SignUpContainer onPress={props.onDelete.bind(this, props.id)}>
            <Text bold center color="#ffffff"> {props.title}</Text>
    </SignUpContainer>
    );
}; 

const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px; 
  height: 40px; 
  align-items: center; 
  justify-content: center; 
  background-color: #88d498;
  border-radius: 6px;
`;

export default MemberItem; 