import React, {createContext, useState,useEffect,
    useLayoutEffect, useCallback, useContext } from "react";
import styled from "styled-components/native"; 
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { GiftedChat } from 'react-native-gifted-chat'
import { Keyboard, KeyboardAvoidingView, ScrollView} from "react-native";



export default ChatScreen = ({navigation}) => {
  

const firebase = useContext(FirebaseContext); 
const [user, setUser] = useContext(UserContext); 
const [messages, setMessages] = useState([]);


//https://blog.jscrambler.com/build-a-chat-app-with-firebase-and-react-native

//retrive old messages
useEffect(() => {
 
  return () => setMessages(newarray => firebase.RetriveMessages()); 

}, []);

const groupID = 100; 

const onSend = useCallback((messages = []) => {
  setMessages(previousMessages =>
    GiftedChat.append(previousMessages, messages)
  );
  const { id, createdAt, text} = messages[0];    
  firebase.SendMessage(id,createdAt, text, groupID); 

}, []);
  
  //Skal man vise private meldinge? 
return(
    <GiftedChat 
        messages={messages}
        showAvatarForEveryMessage={false}
        onSend={messages => onSend(messages)}
        user={{
        id: firebase.getCurrentUser(),
        }}
    />

  );
}