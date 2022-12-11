import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components/native"; 
import { KeyboardAvoidingView, ScrollView, Alert} from "react-native";
import {FirebaseContext} from "../../context/FirebaseContext";
import {UserContext} from "../../context/UserContext";
import {Switch} from "react-native";
import {Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, 
  VStack, Spacer, Center, Image,Divider,Stack, Button, FormControl, Input, Link, WarningOutlineIcon} from "native-base";

export default LogInScreen = ({navigation}) => {

  const firebase = useContext(FirebaseContext); 
  const [User, setUser] = useContext(UserContext); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [Isloggedin, setIsloggedin] = useState(""); 
  const [RememberMe, setRememberMe] = useState(true);  
  const [Valid, setValid] = useState(false);  
    
    
  const handleLogin = async () => {

    if(RememberMe === true){
      if (email && password) {
   
        try{
          await firebase.SignInUser(email, password);
          console.log("uid");
          const uid = await firebase.getCurrentUser().uid; 
          console.log("uid",uid);
          const userInfo = await firebase.getUserInfo(uid)

          setUser({
            username: userInfo.username,
            email: email, 
            password: password,
            uid: uid, 
            groups: userInfo.groups, 
            profilePhotoUrl: userInfo.profilePhotoUrl,
            isLoggedIn: true, 
          })

        }catch{
          setValid(true)
        }
      } 
    }
    else{
      try{
        await firebase.SignInUser(email, password);
        const uid =  await firebase.getCurrentUser().uid; 
        console.log("uid");
        const userInfo =  await firebase.getUserInfo(uid)
    
        setUser({
          username: userInfo.username,
          email: userInfo.email, 
          password: userInfo.password,
          uid: uid, 
          groups: userInfo.groups, 
          profilePhotoUrl: userInfo.profilePhotoUrl,
          isLoggedIn: true, 
        })
      }catch{
        setValid(true)
    }}
    }
 

  const toggleSwitch = () => setRememberMe(previousState => !previousState);

  return(
    <Box>
        <Box pt="150" p="7">
          <Box justifyContent="center" alignItems="center">
            <Image h="100" w="200" source={require("../../assets/logo.png")} alt="Logo"/>
          </Box>

          <VStack space={3} mt="5" pt="12">
        
              <FormControl isInvalid={Valid}>
              <FormControl.Label>Email</FormControl.Label>
              <Input 
                autoCapitalize="none" 
                autoCompleteType="email" 
                autocorrect={false} 
            
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail(email.trim())}/>

          <FormControl.Label>Password</FormControl.Label>
              <Input 
               type="password" 
               autoCapitalize="none" 
               autoCompleteType="password" 
               autocorrect={false} 
             
               secureTextEntry={true}
               value={password}
               onChangeText={password => setPassword(password.trim())}/>

              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Wrong password or email.
              </FormControl.ErrorMessage>

            </FormControl>

              <Link _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "#88d498"
            }} alignSelf="flex-end" mt="1">
                Forgot Password?
              </Link>

          <HStack alignItems="center" justifyContent="center" space={4}>
            <Text>Keep me logged in</Text>
            <Switch 
              size="sm" 
              onValueChange={toggleSwitch}
              value={RememberMe}
              />
          </HStack>

          <Button  mt="3"  onPress={handleLogin}>
            Sign in
          </Button>

          <HStack mt="6" justifyContent="center" >
            <Text fontSize="sm"  >
              I'm a new user.{" "}
            </Text>
            <Link onPress={() => navigation.push("SignUpScreen")} _text={{
              color: "#88d498",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

/*
<Box>
            <AuthContainer>
              <AuthTitle>Email address</AuthTitle>
              <AuthField 
                autoCapitalize="none" 
                autoCompleteType="email" 
                autocorrect={false} 
            
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail(email.trim())}
              />
            </AuthContainer>

            <AuthContainer>
              <AuthTitle>password</AuthTitle>
              <AuthField 
                autoCapitalize="none" 
                autoCompleteType="password" 
                autocorrect={false} 
              
                secureTextEntry={true}
                value={password}
                onChangeText={password => setPassword(password.trim())}
              />
            </AuthContainer>
          </Box>

        <StayLoggedIn>
            <Text small> 
                Keep me logged in </Text>
          <SwitchView>
            <Switch 
              trackColor={{ false: "#767577", true: "#88d498"}}
              thumbColor={Isloggedin ? "#88d498" : "#cccccc"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={RememberMe}
            />
          </SwitchView>
        </StayLoggedIn>

          <SignInContainer onPress={handleLogin} disable={loading}>
            {loading ? (<Loading/>) : (
            <Text bold center color="#ffffff">
              Sign In</Text>
            )}
          </SignInContainer>

          <SignUp onPress={() => navigation.push("SignUpScreen")}>
            <Text small center> 
                New to Achive? <Text bold color="#88d498">Sign Up</Text></Text>
          </SignUp>

      </Box>
      */


