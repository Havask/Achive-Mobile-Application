import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput} from "react-native"; 
import GroupCards from "../components/GroupCard";
import Colors from "../constants/colors.js";
import { auth, db } from "../firebase.js";
import {signInWithEmailAndPassword, signOut} from "firebase/auth"; 
import { NavigationContainer } from "@react-navigation/native";


const HomeScreen = ({navigation}) => {

  const getUserData = uid => {
    db().ref('users/' + uid).once("value", snap => {
      console.log(snap.val())
  })
}; 
  auth.onAuthStateChanged(user => {
    if (user) {
        const userID = getUserData(user.uid)
        console.log(userID)
    }
  })

  //generate a new color each time it is called
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const SignOutUser = () => {
    
    auth
    .signOut()
    .then(() => {
      navigation.replace("LogInScreen")
    })
    .catch(error=> alert(error.message))
  }

  const createGroupHandler = () => {
  
  };

  //when creating a group the random color should make a color
  return (
        <View style={styles.screen}>
            <Button title="sign out" onPress={SignOutUser}/>
            <Text>Email: {auth.currentUser?.email} </Text>

            <TouchableOpacity
              style = {styles.button}
              onPress={() => createGroupHandler()}
            >
              <Text style={styles.textstyle}>Add a group</Text>
            </TouchableOpacity>
  
        </View>
  );
};

const styles = StyleSheet.create({

  screen: {
      flex: 1, 
      paddingTop: 50, 
      alignItems: "center",
      backgroundColor: Colors.primary,
  },

  button: {
    backgroundColor: '#0782F9',
    width: '60%',
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

  textstyle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

}); 

export default HomeScreen;
//onPress={() => navigation.push("HomeScreen")}