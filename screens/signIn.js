import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput, KeyboardAvoidingView} from "react-native"; 
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import GroupCards from "../components/GroupCard";
import Colors from "../constants/colors.js";
import { auth, db } from "../firebase.js";


function SignInScreen({navigation}) {

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  function writeUserData(user) {
    firebase.database().ref('users/' + user.uid).set(user).catch(error => {
        console.log(error.message)
    });
  }

  const handleSignUp = () =>{
    const userAuth = createUserWithEmailAndPassword(auth,email,password);

    var user = {
      name: name,
      uid: userAuth.uid,
      email: userAuth.email
      }
    writeUserData(user)

    .catch((error)=>{
      console.log(error.message); 
    })
  }

  return(
    <KeyboardAvoidingView 
    style = {styles.container}
    behavior="padding">
      <View style={styles.inputContainer}>

        <Image style = {styles.logo} 
        source={require("../assets/logo.png")}
        />

        <TextInput
          style={styles.username}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.username}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          placeholder="Passord"
          style={styles.password}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      
      <View style ={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => {
              navigation.push("HomeScreen"); 
              handleSignUp(); 
              }}>
            <Text styles={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.primary
},

logo: {
  width: 320,
  height: 300,
},

username: {
  backgroundColor: 'white',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 10,
}, 

buttonContainer: {
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,
},

password: {
  backgroundColor: 'white',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 10,
}, 

textstyle: {
  color: 'white',
  fontWeight: '700',
  fontSize: 16,
},

button: {
  backgroundColor: '#0782F9',
  width: '100%',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
},
buttonOutline: {
  backgroundColor: 'white',
  marginTop: 5,
  borderColor: '#0782F9',
  borderWidth: 2,
},

buttonContainer:{
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,
}, 

buttonOutlineText: {
  color: '#0782F9',
  fontWeight: '700',
  fontSize: 16,
},
inputContainer: {
  width: '80%'
},

}); 

export default SignInScreen;