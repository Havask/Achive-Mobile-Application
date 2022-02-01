import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, 
    Text, View, Image, Button, TextInput, 
    ScrollView, FlatList} from "react-native"; 

import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";

function ToDo(props){
    const [courseGoals, setCourseGoals] = useState([]); 
    const [isAddMode, setIsAddMode] = useState(false);

    const addGoalHandler = goalTitle => {
        setCourseGoals(currentGoals => [
            ...currentGoals, 
            {id: Math.random().toString(), value: goalTitle}
        ]); 
        setIsAddMode(false); 
    }

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals =>{
            /* return a new array filter based on a new critiria */
            return currentGoals.filter((goal) => goal.id !== goalId); 
        });
    }

    const cancelGoalHandler = () => {
        setIsAddMode(false); 
    }; 

    return(
        /* Background*/ 
        <View style={styles.container}>

            <View >
                <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
            </View>

            <GoalInput 
            onCancel={cancelGoalHandler}
            visible={isAddMode} 
            onAddGoal={addGoalHandler}/>

            <FlatList 
            keyExtractor={(item,index) => item.id} 
            data ={courseGoals} 
            renderItem={itemData => <GoalItem 
            id={itemData.item.id} 
            onDelete ={removeGoalHandler} 
            title={itemData.item.value}/>} 
            />

        </View>
    ); 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#88d498",
        padding: 60, 
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