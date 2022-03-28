import React, {useState,useEffect,
    useCallback, useContext, useRef } from "react";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { Chatty } from "react-native-chatty";

export default ChatScreen = ({navigation}) => {
  
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 

  const text = useRef()

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello',
      me: true,
      createdAt: new Date(),
      user: {
        id: 1,
        username: 'John Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
  ])

  const onPressSend = (data) => {
    // Implement

    socket.send(data)
  }
  
//Skal man vise private meldinge? 
return(
  <Chatty
    messages={messages}
    headerProps={{
      id: 0,
      username: "Muhammed Kaplan",
      avatar: {
        uri: "https://blalala.com"
      }
      }}
    
    footerProps={{
      // To prevent any unnecessary re-rendering, we're using ref instead of states.
      onChangeText: (_text) => text.current = _text,
      onPressSend
    }}
  />
 );

}

