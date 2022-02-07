import React from "react";
import {View, StyleSheet} from "react-native";
import Colors from "../constants/colors.js";

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        shadowColor: "black",
        elevation: 5,
        backgroundColor: Colors.primary,
        padding: 20
    }
})

export default Card; 