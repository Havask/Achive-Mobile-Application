import React, {useState} from "react";
import {View, 
        Text, 
        StyleSheet, 
        TextInput, 
        Button,
        TouchableWithoutFeedback,
        Keyboard,
        Alert,
    } from "react-native";
import { backgroundColor, shadowColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

import Card from "../components/Card.js";
import Colors from "../constants/colors.js";
import Input from "../components/input.js"
import NumberContainer from "../components/NumberContainer.js"

export default function StartGameScreen(props){

    const [enteredValue, setEnteredValue] = useState("")
    const [confirmed, setConfirmed] = useState(false); 
    const [selectedNumber, setSelectedNumber] = useState(""); 

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, "")); 
    } 

    const resetInputHandler = () => {
        setEnteredValue("")
    }

    const confirmInputHandler = () =>{

        const chosenNumber = parseInt(enteredValue)
        if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert("Invalid Number!", "number hos to be a number", [{text: "okey", style: "destructive", onPress: resetInputHandler}])
            return; 
        }

        setConfirmed(true); 
        setSelectedNumber(chosenNumber)
        setEnteredValue("")
        Keyboard.dismiss()
    }

    let confirmedOutput; 

    if(confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer} >
                <Text> You selected: </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" />
            </Card>
        ); 
    }

    return(
        <TouchableWithoutFeedback 
        onPress={() => {
            Keyboard.dismiss(); 
          }}
        >
            <View style={styles.screen}>
                <Text style={styles.textStyle}>start a new game</Text>
                <Card 
                style ={styles.inputContainer}>
                    <Text>Select a number:</Text>
                    <Input 
                    style={styles.input}
                    blurOnSubmit
                    autoCorrect = {false}
                    keyBoardType = "number-pad"
                    maxLength = {2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>

                        <View style={styles.button}> 
                            <Button title = "Reset" onPress={resetInputHandler} color={Colors.resetBotton} /> 
                        </View>
                        <View style={styles.button}> 
                            <Button title = "Confirm" onPress={confirmInputHandler} /> 
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>     
        </TouchableWithoutFeedback>
    ); 
};

const styles = StyleSheet.create({

    button: {
       width: 80,
    }, 
    screen:{
        alignItems: "center",
        justifyContent: "center"
        
    }, 

    textStyle: {
        alignItems: "baseline",
        textAlign: "center",
    
    },

    inputContainer:{
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
    
    },

    buttonContainer:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15, 
    },
    input:{
        width: 50,
        textAlign: "center", 
    },

    summaryContainer: {
        marginTop: 20, 
        alignItems: "center"
    }
})

