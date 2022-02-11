import React from "react";
import {View, StyleSheet} from "react-native";
import Colors from "../constants/colors.js";

const GroupCards = props => {
    return <View style={{...styles.card, ...props.style}}>
                {props.children}
            </View>
};

const styles = StyleSheet.create({
    card: {
        shadowColor: "black",
        elevation: 5,
        backgroundColor: "white",
        padding: 20
    }
})

export default GroupCards; 