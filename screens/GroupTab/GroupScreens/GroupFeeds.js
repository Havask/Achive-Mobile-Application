import React, {useState, useContext, useEffect} from "react";
import {Entypo, Ionicons} from "@expo/vector-icons"; 
import {FirebaseContext} from "../../../context/FirebaseContext";
import {UserContext} from "../../../context/UserContext";
import {GroupContext} from "../../../context/GroupContext";
import { FontAwesome } from '@expo/vector-icons'
import { Timestamp } from "firebase/firestore";
import {Flex,Box, Pressable, Heading, IconButton, Icon, HStack, 
  Avatar, VStack, Spacer, Center,Divider,Stack, Button, Input, Text, Image} from "native-base";

import * as Haptics from 'expo-haptics';
import {RefreshControl, FlatList} from 'react-native';


export default GroupFeeds = ({navigation}) => {

  const [group, setGroup] = useContext(GroupContext); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  const [post, setPost] = useState([])
  const [text, setText] = useState("")
  const [feed, setfeed] = useState([]); 
  const [sortsetting, setsortsetting] = useState("recent"); 
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
      id: "1223434",
      user: {
        username: "Synnøve", 
        profilePhotoUrl: "https://picsum.photos/96/96"
      },
      postedAt: Timestamp,
      post: "Hei Håvard",
      photoUrl: "https://picsum.photos/200/300",
      Upvotes: 21,
      Downvotes: 3
    },
    {
      id: "12234134",
      user: {
        username: "Synnøve", 
        profilePhotoUrl: "https://picsum.photos/96/96"
      },
      postedAt: Timestamp,
      post: "Hei Håvard",
      photoUrl: "https://picsum.photos/200/300",
      Upvotes: 21,
      Downvotes: 3
    },
    {
      id: "12234341",
      user: {
        username: "Synnøve", 
        profilePhotoUrl: "https://picsum.photos/96/96"
      },
      postedAt: Timestamp,
      post: "Hei Håvard",
      photoUrl: "https://picsum.photos/200/300",
      Upvotes: 21,
      Downvotes: 3
    },
  ]
useEffect(() => {
  FirstRefresh(); 
}, []);

const FirstRefresh = async () => {
  try{
    const RetrivedFeed = await firebase.RetriveFeed(sortsetting); 
    setfeed(RetrivedFeed); 

  }catch {
    console.log("Something went wrong @FirstRefresh"); 
  }
};


//fetch the latest feed for 
const RetriveFeed = async () => {
  try{
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    const RetrivedFeed = await firebase.RetriveFeed(sortsetting); 
    console.log(RetrivedFeed); 

    setfeed(RetrivedFeed); 

  }catch {
    console.log("Something went wrong @RetriveFeed"); 
  }
};

const makeid = length => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
 }
  return result;
}

const sett = async () => {
  setPost(
    {
      id: makeid(10), 
      user: {
        uid: user.uid,
        username: user.username, 
      }, 
      avatar:{uri: user.profilePhotoUrl},
      postedAt: new Date(),
      post: text,   
      Upvotes: 0, 
      Downvotes: 0, 
    }); 
}

//Ha en max lengde på posten. 
const SendPost = async () => {

  await sett(); 
  try{
    await firebase.AddPost(post, group.groupID)
  }catch(error){
    console.log("Error @SendPost", error)
  }
};

const Upvote = async () => {

  await sett(); 
  try{
    await firebase.AddPost(post, group.groupID)
  }catch(error){
    console.log("Error @SendPost", error)
  }
};

  const renderPost = ({item}) =>(
    <Box bg="#ffffff" p="3">
      <Flex Flex direction="row" > 
    
        <Avatar  w="16" h="16"   source={{uri: item.user.profilePhotoUrl}}/>

        <Box flex="1">
          <Text>{item.user.username}</Text>
          <Text>
            {item.user.postedAt}
          </Text>
        </Box>
        <IconButton onPress={SendPost}
            icon={ <Entypo name="dots-three-horizontal" size={16} color="#73788b" />}
          />
      </Flex>

      <Box>
        <Text>{item.post}</Text>
          <Image source={{uri: item.photoUrl}} size="xl" w="100%" alt="ProfilePhoto" /> 
        <Flex Flex direction="row">
          <Flex direction="row" >
            
            <IconButton onPress={Upvote}
                icon={ <Ionicons name ="ios-arrow-up-circle-outline" size={24} color="#73788b"/>}
              />
            <Text>
              {item.Upvotes}
            </Text>
          </Flex>

          <Flex direction="row" >
            <IconButton onPress={SendPost}
              icon={  <Ionicons name ="ios-chatbox-ellipses-outline" size={24} color="#73788b"/>}
            />
            <Text tiny margin= "0 0 0 8px">
             {item.comments}
            </Text>
          </Flex>

        </Flex>
      </Box>
    </Box>
  )

  return(
    <Box pt="3">
      <Box >
        <Flex Flex direction="row" pb="4">
          <Input size="md" mx="3" placeholder="What on your mind?" w="75%" maxWidth="300px" 
          autocorrect={false} 
          autoFocus={true} 
          value={text}
          onChangeText={text => setText(text)}
          />
          <IconButton onPress={SendPost}
            icon={ <FontAwesome 
              name="pencil-square-o" 
              size={40} 
              color="black" 
            />}
          />
        </Flex>

        <FlatList 
          data={data} 
          renderItem={renderPost} 
          keyExtractor={item => item.id.toString()} 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={RetriveFeed} />}
          />
      </Box>
    </Box>
  );
}
