import React from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button} from "react-native"; 
import LogInScreen from "./app/screens/LogInScreen.js";
import GroupScreen from "./app/screens/GroupScreen.js";
import Todo from "./app/screens/Todo.js"; 
import Colors from "./app/constants/colors.js"

import Header from "./app/components/Header.js"
import StartGameScreen from "./app/screens/StartGameScreen"

export default function App() {
  return(
    <View style={styles.background} >
      <Header title="Guess the number"/>
      <StartGameScreen/>
    </View>
  ); 
}

const styles = StyleSheet.create({

    background:{
      flex: 1, 
      backgroundColor: Colors.primary, 
      justifyContent: "center"
    }
})