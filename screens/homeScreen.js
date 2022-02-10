import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput} from "react-native"; 
import GroupCards from "../components/GroupCard";

const HomeScreen = ({navigation}) => {
  return (
        <View style={styles.screen}>
            <GroupCards style={styles.buttonContainer}>
              <Text>Home</Text>
            </GroupCards> 
            <GroupCards style={styles.buttonContainer} >
              <Text>Home</Text>
            </GroupCards> 
        </View>
  );
};

const styles = StyleSheet.create({

  screen: {
      flex: 1, 
      padding: 10, 
      alignItems: "center"
  },

  buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",    
      marginTop: 20,
      width: 300, 
      maxWidth: "80%", 
  }, 
  text: {
      fontSize: 20
  }
}); 

export default HomeScreen;
//onPress={() => navigation.push("HomeScreen")}