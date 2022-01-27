import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput} from "react-native"; 
function LogInScreen(props) {

    const [state, setState] = useState()
    const onPress = () => setState(state)

    return(

      <View style = {styles.container}>

        <Image style = {styles.logo} 
        source={require("../assets/logo.png")}
        />

      /* -----Innlogging input-------*/
        <TextInput
          placeholder="Username"
          style={styles.username}
        />
        <TextInput
          placeholder="Passord"
          style={styles.password}
        />
       
      /* -----Innlogging knapp-------*/
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
      borderColor: "black", 
      borderWidth: 1, 
      padding: 10, 
  }, 

  username: {
    width: "60%",
    height: 50,
    borderColor: "black", 
    borderWidth: 1, 
    padding: 10, 
    top: -40,
}, 
  password: {
    width: "60%",
    height: 50,
    borderColor: "black", 
    borderWidth: 1, 
    padding: 10, 
    top: -70,
  }, 

  logo: {
    width: 400,
    height: 300,
  },
  
  textstyle: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 24,
  },

}); 

export default LogInScreen;