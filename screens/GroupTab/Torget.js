import React, {useState,useEffect,
    useCallback, useContext } from "react";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { GiftedChat } from 'react-native-gifted-chat'

export default TorgetScreen = ({navigation}) => {
    
    const firebase = useContext(FirebaseContext); 
    const [user, setUser] = useContext(UserContext); 
    const [messages, setMessages] = useState([]);
    
    /*
    En felles chat/innleggs plass. 
    -Hver innleggsboble tar deg til en ny chat der folk prate om det 
    -
    -
    */

//https://blog.jscrambler.com/build-a-chat-app-with-firebase-and-react-native

//retrive old messages
useEffect(() => {
  setMessages(DemoMessage)
  //return () => setMessages(messages => firebase.RetriveMessages()); 

}, []);


const onSend = useCallback((messages = []) => {
  setMessages(previousMessages =>
    GiftedChat.append(previousMessages, messages)
  );
  const { text} = messages[0];    
  firebase.SendMessage(text); 

}, []);
  
//Skal man vise private meldinge? 
return(
    <GiftedChat 
        messages={messages}
        showAvatarForEveryMessage={false}
        onSend={messages => onSend(messages)}
        bottomOffset={80}
        user={{
          id: firebase.getCurrentUser(),
        }}
    />
  );
}

