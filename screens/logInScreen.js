import React, {useEffect, useState} from "react";
import Colors from "../constants/colors.js";
import { auth } from "../firebase.js";
import {signInWithEmailAndPassword} from "firebase/auth"; 

import {StyleSheet, 
  TouchableOpacity, 
  Text, View, 
  Image, Button, 
  TextInput, 
  KeyboardAvoidingView} from "react-native"; 

  
function LogInScreen({navigation}) {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          navigation.navigate("HomeScreen")
        }
      })
      return unsubscribe; 
    }), [1]

    const handleSignIn = () =>{
      signInWithEmailAndPassword(auth,email,password)
      .then((re) => {
        console.log(re); 
        setIsSignedIn(true); 
      })
      .catch((re)=>{
        console.log(re); 
      })
    }

    return(
      <KeyboardAvoidingView 
      style = {styles.container}
      behavior="padding">
        <View style={styles.inputContainer}>

          <View style={styles.imageStyle}>
            <Image style = {styles.logo} 
            source={require("../assets/logo.png")}
            />
          </View>

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
              style = {styles.button}
              onPress={() => {
              navigation.push("HomeScreen"); 
              handleSignIn(); 
              }}>

              <Text style={styles.textstyle}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => navigation.push("SignIn")}
            >
              <Text styles={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

  imageStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55%',
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },

  logo: {
    width: 320,
    height: 400,
  },

  username: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
    marginTop: 5,
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

export default LogInScreen;