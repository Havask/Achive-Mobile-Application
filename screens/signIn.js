import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput, KeyboardAvoidingView} from "react-native"; 
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import GroupCards from "../components/GroupCard";
import Colors from "../constants/colors.js";

const SignInScreen = ({navigation}) => {
  return (
        <KeyboardAvoidingView style={styles.screen}>
            <Text>SignInScreen</Text>

        </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  screen: {
      flex: 1, 
      padding: 10, 
      alignItems: "center", 
      backgroundColor: Colors.primary,
  },
}); 

export default SignInScreen;
//onPress={() => navigation.push("HomeScreen")}