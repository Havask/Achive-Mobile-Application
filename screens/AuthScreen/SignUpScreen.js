import React, {useState, useContext} from "react";
import * as ImagePicker from "expo-image-picker"
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, 
  VStack, Spacer, Center, Image,Divider,Stack, Button, FormControl, Input, Link, WarningOutlineIcon} from "native-base";

export default SignUpScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [_, setUser] = useContext(UserContext); 
  const [username, setUsername] = useState(); 
  const [email, setEmail] = useState(); 
  const [password, setPassword] = useState(); 
  const [profilePhoto, setProfilePhoto] = useState(); 

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.cancelled) {
      setProfilePhoto(result.uri);
      setUser((state) => ({ ...state, profilePhotoUrl: result.uri})); 
    }
  };

  const signUp = async () => {
    
    const user = {username, email, password, profilePhoto}

    try{
      const createdUser = await firebase.createUser(user)
      setUser({...createdUser, isLoggedIn: true}); 
    }catch(error){
      console.log("Error @SignUp", error); 
    }
  };

  const signUpFacebook = async () => {
  
    try{
      firebase.SignInUserWithFacebook()

    }catch(error){
      console.log("Error @signUpFacebook", error); 
    }
  };

  return(
    <Box p="7">
       <Box pb="10" pt="81" justifyContent="center" alignItems="center" >
         <Heading fontSize="2xl">
              Sign up to get started
         </Heading>
        </Box>

        <Box justifyContent="center" alignItems="center">
          <Pressable  _pressed={{opacity: 0.5}} onPress={pickImage}>
            <Avatar w="100" h="100" pb="1"
            source={{uri: profilePhoto}}
            >
            </Avatar> 
          </Pressable> 
        </Box>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input 
              autocorrect={false} 
              onChangeText={(username) => setUsername(username.trim())}
              value={username}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input              
              autoCapitalize="none" 
              autocorrect={false} 
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input 
              type="password"       
              autoCapitalize="none" 
              autocorrect={false} 
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password.trim())}
              value={password}/>
          </FormControl>
          <Button mt="2"  onPress={signUp}>
            Sign up
          </Button>

          <HStack mt="2" justifyContent="center">
            <Text fontSize="sm"  >
              Already a user?{" "}
            </Text>
            <Link onPress={() => navigation.push("LogInScreen")} _text={{
              color: "#88d498",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
              Sign Up
            </Link>
          </HStack>

          <Box justifyContent="center" alignItems="center" pt="10">
            <Button h="50" w="140" mt="2" justifyContent="center" onPress={signUpFacebook}>
              Facebook login
            </Button>
        </Box>
          
        </VStack>
     </Box>
    );
}
