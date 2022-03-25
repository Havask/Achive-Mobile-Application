import React, {useState,useEffect,
    useCallback, useContext } from "react";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { GiftedChat } from 'react-native-gifted-chat'

export default ChatScreen = ({navigation}) => {
  
const firebase = useContext(FirebaseContext); 
const [user, setUser] = useContext(UserContext); 
const [messages, setMessages] = useState([]);

const DemoMessage = [
  {
      _id: 1,
      text: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ',
      createdAt: new Date(),
      user: {
          _id: 33,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
      },
  },

  {
    _id: 2,
    text: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
    createdAt: new Date(),
    user: {
        _id: 21,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
    },
},

{
  _id: 3,
  text: 'There are many variations of passages of Lorem Ipsum available',
  createdAt: new Date(),
  user: {
      _id: 90,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
  },
},
];

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

