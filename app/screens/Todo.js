import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, Text, View, Image, Button, TextInput, ScrollView} from "react-native"; 

function ToDo(props){
    const [enteredGoals, setEnteredGoal] = useState(""); 
    const [courseGoals, setCourseGoals] = useState([]); 

    const goalInputHandler = (enteredText) =>{
        setEnteredGoal(enteredText)
    };

    const addGoalHandler = () => {
        setCourseGoals(currentGoals => [...currentGoals, enteredGoals]); 
    }

    const removeGoalHandler = () => {
        removeCourseGoals(currentGoals)
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
            <ScrollView>
                {courseGoals.map((goal) => 
                <View key={goal} style={styles.listItem}> 
                    <Text > {goal}</Text> 
                </View>)}
            </ScrollView>
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
    },

    todo: {
        fontSize: 24,
    }, 

    listItem: {
        padding: 10, 
        marginVertical: 10,
        backgroundColor: "#ccc",
        borderColor: "black", 
        borderWidth: 1, 
        
    },
}); 

export default ToDo; 