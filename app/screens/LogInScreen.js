import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button} from "react-native"; 

function LogInScreen(props) {

    const [state, setState] = useState()
    const onPress = () => setState(state)

    return(

      <View style = {styles.container}>

      <Image style = {styles.logo} 
      source={require("../assets/logo.png")}/>

      <TouchableOpacity
        style = {styles.username}
        onPress= {onPress}
      >
        <Text numberOfLines={1} style={styles.textstyle}>haask333@gmail.com </Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style = {styles.password}
        onPress= {onPress}
      >
        <Text style={styles.textstyle}>********</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.loginButton}
        onPress= {onPress}
      >
        <Text style={styles.textstyle}>Log in</Text>
      </TouchableOpacity>
    
      </View>
    );
}

const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: "#88d498",
      alignItems: 'center',
      justifyContent: "space-evenly",

  },

  loginButton: {
      backgroundColor: "#00FF00",
      width: 300,
      height: 60, 
      top: -40,
  }, 

  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#4ecdc4"
  }, 

  username: {
    backgroundColor: "#808080",
    top: 20,
    width: 300,
    height: 40,
}, 
  password: {
  
    backgroundColor: "#808080",
    top: -25,
    width: 300,
    height: 40,
  }, 

  logo: {
    width: 400,
    height: 300,
  },
  
  textstyle: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 0,
    width: 300,
  },

}); 

export default LogInScreen;