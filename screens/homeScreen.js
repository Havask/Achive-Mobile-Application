import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput} from "react-native"; 
import GroupCards from "../components/GroupCard";
import Colors from "../constants/colors.js";

const HomeScreen = ({navigation}) => {

  //generate a new color each time it is called
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const createGroupHandler = () => {

  };

  //when creating a group the random color should make a color
  return (
        <View style={styles.screen}>
            <TouchableOpacity
              style = {styles.buttonContainer}
              onPress={() => createGroupHandler()}
            >
              <Text style={styles.text}>Add a group</Text>
            </TouchableOpacity>
  
        </View>
  );
};

const styles = StyleSheet.create({

  screen: {
      flex: 1, 
      flexDirection: "row",
      padding: 10, 
      alignItems: "center",
      backgroundColor: Colors.primary,
  },

  buttonContainer: {
  
    justifyContent: "space-around",    
    marginTop: 20,
    width: 170, 
    height: 150,
    maxWidth: "80%", 
    backgroundColor: "white"
      
  }, 
  text: {
      fontSize: 20,
      textAlign: 'center',
      
  }
}); 

export default HomeScreen;
//onPress={() => navigation.push("HomeScreen")}