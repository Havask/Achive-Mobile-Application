import { Firestore, getDoc, orderBy } from "firebase/firestore/lite";
import firebase from "../react-native-firebase"; 

import {collection, 
        addDoc,
        doc,
        setDoc, 
        addDoc, 
        getDoc, 
        onSnapshot, 
        query, 
        where, 
        getDocs, 
        orderBy, 
        limit, 
     } from "firebase/firestore"; 

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



//write to a document
export function writeToDoc(){
    const docData={
        task: "Rydd kjøkkenet", 
        description: "To the dishes", 
        status: "Ikke gjort",
    }; 

    //replaces the document
    setDoc(writeToDoc, docData, {merge:true})
    .then(() => {
        consol.log("Written to database")
    })
    .catch((error) => {
        console.log("error accured ${error}"); 
    }); 
}


const ordersCollection = collection(Firestore, "groups")
//makes a document in the collection with a random generated ID
export async function addNewDocument(){
    const newDoc = await addDoc(ordersCollection, {
        task: "Rydd kjøkkenet", 
        description: "To the dishes", 
        status: "Ikke gjort",
    }); 
    console.log("new document created at ${newDoc.path}");
}

//reads a single document
export async function readASingleDoc(){
    const mySnapshot = await getDoc(tasks);
    if(mySnapshot.exists){
        const docData = mySnapshot.data(); 
        console.log("My data is ${json.stringify(docData)}"); 
    }
}

//function for grabbing multible documents at once (query)
export function queryForDocuments(){
    const TaskQuery = query(
        collection(Firestore, "Groups"), 
        //filtering the query
        where("status" == "aktiv"),
        orderBy("Status"),
        //limits the results. Kan bruke dette til å 
        //spørre databasen for ting å gjøre også og displaye et fixed antall 
        //det gjør det også billigere
        limit(10), 
    ); 
    //returns an array of the results from query
    const querySnapshot = await getDocs(TaskQuery); 
    querySnapshot.forEach((snap) => {
        console.log("Document ${snap.id} contains ${JSON.stringify(snap.data())}")
    })
}