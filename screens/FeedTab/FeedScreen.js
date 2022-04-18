import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {Entypo, Ionicons} from "@expo/vector-icons"; 
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {GroupContext} from "../../context/GroupContext";
import { FontAwesome } from '@expo/vector-icons'
import { Timestamp } from "firebase/firestore";

import * as Haptics from 'expo-haptics';

import {
  RefreshControl, Vibration
} from 'react-native';

/* 
-Kan kun lese å delta på tråder som blir displayet i feeden. 
-

*/ 
export default FeedScreen = ({navigation}) => {

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
    console.log("Something went wrong @RetriveFeed"); 
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

//fetch the latest feed for 

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

  const renderPost = ({item}) =>(
    <PostContainer>

      <PostHeaderContainer> 
        <PostProfilePhoto  source={{uri: item.user.profilePhotoUrl}}/>

        <PostInfoContainer>
          <Text medium>{item.user.username}</Text>
          <Text tiny color="#c1c3cc" margin="4px 0 0 0">
            {item.user.postedAt}
          </Text>
        </PostInfoContainer>

      <Options>
        <Entypo name="dots-three-horizontal" size={16} color="#73788b" />
      </Options>

      </PostHeaderContainer>
      <Post>
        <Text>{item.post}</Text>
        <PostPhoto source={{uri: item.photoUrl}} /> 
        <PostDetails>

          <PostLikes>
            <Ionicons name ="ios-arrow-up-circle-outline" size={24} color="#73788b"/>
            <Text tiny margin="0 0 0 8px">
              {item.likes}
            </Text>
          </PostLikes>

          <PostComments>
            <Ionicons name ="ios-chatbox-ellipses-outline" size={24} color="#73788b"/>
            <Text tiny margin= "0 0 0 8px">
             {item.comments}
            </Text>
          </PostComments>

        </PostDetails>
      </Post>
    </PostContainer>
  )

  return(
    <Container>
      <FeedContainer>
        <Feed 
          data={data} 
          renderItem={renderPost} 
          keyExtractor={item => item.id.toString()} 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={RetriveFeed} />}
        />
      </FeedContainer>
    <StatusBar barStyle="dark-content" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1; 
  background-color: #ebecf3;
  padding-top: 15px; 
`;

const FeedContainer = styled.View`

`;

const Feed = styled.FlatList`

`;

const StatusBar = styled.StatusBar` 

`;
const PostContainer = styled.View`
  margin: 16px 16px 0 16px; 
  background-color: #ffffff;
  border-radius: 6px; 
  padding: 8px; 
`;

const PostHeaderContainer = styled.View`
  flex-direction: row; 
  align-items: center; 
`;

const PostInfoContainer = styled.View`
  flex: 1; 
  margin: 0 16px; 
`;

const PostProfilePhoto = styled.Image`
  width: 48px; 
  height: 48px; 
  border-radius: 24px; 
`;

const PostPhoto = styled.Image`
  width: 100%; 
  height: 150px; 
  border-radius: 6px; 
`;

const PostDetails = styled.View`
  flex-direction: row; 
  margin-top: 8px; 
`;

const Options = styled.View`

`;

const Post = styled.View`
  margin-left: 64px; 
`; 

const PostComments = styled.View`
  flex-direction: row; 
  align-items: center; 
  margin-left: 16px; 

`; 

const PostLikes = styled.View`
  flex-direction: row; 
  align-items: center; 
`; 

