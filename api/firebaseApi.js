import { Firestore } from "firebase/firestore/lite";
import firebase from "../react-native-firebase"; 

//adds a new task to the backend
export function addTask(task, addComplete){
    Firestore()
    .collection(grupper)
    .add({
        name: task.name,
        status: task.status, 
        createdAt: Firestore.fieldValue.serverTimestamp()
    }).then((data) => addComplete(data))
.catch((error) => console.log(error)); 
}

//gets a list of tasks stored inside a group
export async function getTasks(taskRetreived){
    var foodList = []
    var snapshot = await firebase.firestore()
    .collection("groups")
    .orderBy("createdAt")
    .get()

    snapshot.forEach((doc) => {
        foodList.push(doc.data()); 
    }); 

    taskRetreived(foodList); 
}

export function removeTask(){
    return; 
}

export function removeGroup(){
    return; 
}
export function addGroup(){
    return; 
}