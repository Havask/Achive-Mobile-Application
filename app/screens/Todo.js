import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput} from "react-native"; 

function ToDo(props){
    return(
        /* Background*/ 
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput placeholder = "Goal" style ={styles.input}/>
                <Button title = "Add" />
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#88d498",
        alignItems: 'center',
        justifyContent: "flex-start",
        padding: 50, 
    },

    inputContainer:{
        borderColor: "black", 
        borderWidth: 1, 
        padding: 10, 
        width: 300,
        height: 60, 
    }
}); 

export default ToDo; 