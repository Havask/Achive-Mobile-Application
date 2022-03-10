import React, {useState} from "react"; 
import {View, Text, StyleSheet, Button, 
    TextInput, Modal} from "react-native"; 

const GoalInput = props => {

    const [enteredGoal, setEnteredGoal] = useState(""); 

    const goalInputHandler = (enteredText) =>{
        setEnteredGoal(enteredText)
    };

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal(""); 
    }
    
    return(
        <Modal visible ={props.visible} animationType="slide">
            <View style={styles.container}>

                <TextInput 
                placeholder = "Goal" 
                style = {styles.input}
                onChangeText = {goalInputHandler}
                value={enteredGoal}
                />
                <View style={styles.button}>
                    <Button title = "Legg til" onPress={addGoalHandler}/>
                </View>
                <View style={styles.button}>
                    <Button title = "Avbryt" color = "red" onPress={props.onCancel}/>
                </View>
            </View>
        </Modal>
    ); 
};

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: "#88d498",
        justifyContent: "center",
        alignContent: "center",
    },
    
    input:{
        borderColor: "black",
        borderWidth: 1,
        padding: 15,
        margin: 10,
    },

    button:{
        marginRight: 80, 
        marginLeft: 80, 
        margin: 10,
        
    },
});

export default GoalInput; 