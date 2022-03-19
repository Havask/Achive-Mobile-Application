import React, {createContext, useState,useEffect,
    useLayoutEffect,useCallback,useContext } from "react";
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

useEffect(() => {
  
    return () => firebase.unsub(); ;
  }, []);


const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );

    const { id, createdAt, text, user } = messages[0];    
    firebase.SendMessage(id, createdAt, text, user); 
  }, []);

return(


    <GiftedChat 
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
        _id: firebase.getCurrentUser(),
        avatar: 'https://i.pravatar.cc/300'
        }}
    />

  );
}