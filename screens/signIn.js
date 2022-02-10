import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput} from "react-native"; 
import GroupCards from "../components/GroupCard";

const SignInScreen = ({navigation}) => {
  return (
        <View style={styles.screen}>
            <Text>SignInScreen</Text>
            
        </View>
  );
};

const styles = StyleSheet.create({

  screen: {
      flex: 1, 
      padding: 10, 
      alignItems: "center"
  },
}); 

export default SignInScreen;
//onPress={() => navigation.push("HomeScreen")}