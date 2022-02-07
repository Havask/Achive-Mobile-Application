import React from "react";
import {View, TextInput, StyleSheet} from "react-native";
import Colors from "../constants/colors.js";

export default function Header(props){
    return( 
        <TextInput {...props} style={{...styles.input, ...props.style}}/>
    ); 
};

const styles = StyleSheet.create({

    input:{
        height: 30, 
        borderBottomColor: "grey", 
        borderBottomWidth: 1,
        marginVertical: 10, 
    },
})
