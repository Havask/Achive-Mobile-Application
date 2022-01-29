import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput} from "react-native"; 

function ToDo(props){
    const [enteredGoals, setEnteredGoal] = useState(""); 
    const [courseGoals, setCourseGoals] = useState([]); 

    const goalInputHandler = (enteredText) =>{
        setEnteredGoal(enteredText)
    };

    const addGoalHandler = () => {
        setCourseGoals(currentGoals => [...currentGoals, enteredGoals]); 
    }

    return(
        /* Background*/ 
        <View style={styles.container}>
            <View>
                <Text style ={styles.todo}> Todo: </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                placeholder = "Goal" 
                style ={styles.input}
                onChangeText={goalInputHandler}
                value={enteredGoals}
                />
                <Button title ="Add" onPress={addGoalHandler} />
            </View>
            <View>
                {courseGoals.map((goal) => <text>{goal}</text>)}
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#88d498",
        padding: 50, 
    },

    inputContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "black", 
        borderWidth: 2, 
        padding: 10, 
        width: 300,
        height: 60, 
    },

    todo: {
        fontSize: 24,
    }, 
}); 

export default ToDo; 