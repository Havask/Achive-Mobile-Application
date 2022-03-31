import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import Text from "../../components/Text.js";
import {Entypo, Ionicons} from "@expo/vector-icons"; 
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import { Timestamp } from "firebase/firestore";

/* 
-Kan kun lese å delta på tråder som blir displayet i feeden. 
-

*/ 
export default FeedScreen = ({navigation}) => {

  const [profilePhoto, setProfilePhoto] = useState(); 
  const firebase = useContext(FirebaseContext); 
  const [user, setUser] = useContext(UserContext); 
  const [post, setPost] = useState([])
  
  const data = [
  {
    id: "1223434",
    user: {
      username: "Håvard", 
      profilePhotoUrl: "https://picsum.photos/96/96"
    },
    postedAt: Timestamp,
    post: "Hei There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    photoUrl: "https://picsum.photos/200/300",
    Upvotes: 21,
    Downvotes: 3
  },
  {
    id: "12123324234",
    user: {
      username: "Synnøve", 
      profilePhotoUrl: "https://picsum.photos/96/96"
    },
    postedAt: Timestamp,
    post: " Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    Upvotes: 21,
    Downvotes: 3
  },

  {
    id: "12324123234",
    user: {
      username: "Synnøve", 
      profilePhotoUrl: "https://picsum.photos/96/96"
    },
    postedAt: Timestamp,
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
    PhotoUrl: "https://picsum.photos/200/300",
    Upvotes: 21,
    Downvotes: 3
  },

  {
    id: "12342324123",
    user: {
      username: "Synnøve", 
      profilePhotoUrl: "https://picsum.photos/96/96"
    },
    postedAt: Timestamp,
    post: "Hei Håvard",
    PhotoUrl: "https://picsum.photos/200/300",
    Upvotes: 21,
    Downvotes: 3
  },

  {
    id: "11232234324",
    user: {
      username: "Synnøve", 
      profilePhotoUrl: "https://picsum.photos/96/96"
    },
    postedAt: Timestamp,
    post: "Hei Håvard",
    PhotoUrl: "https://picsum.photos/500/1000",
    Upvotes: 21,
    comments: 3
  },
]

useEffect(() => {

}, []);

//fetch the latest feed for 
const RetriveFeed = () => {
  
  return firebase.RetriveFeed(); 
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
        <Text large light center>
          Feed
        </Text>
        <Feed 
          data={data} 
          renderItem={renderPost} 
          keyExtractor={item => item.id.toString()} 
        />
      </FeedContainer>
      <StatusBar barStyle="dark-content" />
     </Container>
    );
}

const Container = styled.View`
  flex: 1; 
  background-color: #ebecf3;
  padding-top: 64px; 
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
  height: 250px; 
`;

const PostHeaderContainer = styled.View`
  flex-direction: row; 
  margin-bottom: 16px; 
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