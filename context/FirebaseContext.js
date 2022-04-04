import React, {createContext, useState,useEffect,
        useLayoutEffect,useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
import {getAuth, 
  deleteUser, 
  sendPasswordResetEmail, 
  signOut, 
  updatePassword, 
  updateEmail, 
  } from "firebase/auth";
import {getStorage, 
  ref,
  uploadBytes, 
  getDownloadURL, 
  } from "firebase/storage";
import {getFirestore, 
  setDoc, 
  doc, 
  updateDoc,
  getDoc, 
  addDoc,
  orderBy,
  query,
  onSnapshot,
  collection,
  arrayUnion,
  arrayRemove,
  where
  } from "firebase/firestore";
import config from "../config/Firebase"
import {signInWithEmailAndPassword, 
        createUserWithEmailAndPassword
        } from "firebase/auth"; 

import { getDatabase } from "firebase/database";

// Initialize Firebase
const app = initializeApp(config);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app); 
const FirebaseContext = createContext(); 
const database = getDatabase(app);


// DOCS: 
//https://firebase.google.com/docs


const Firebase = {
  
  getCurrentUser: () => {
      return auth.currentUser
    },

  createUser: async (user) => {
    try{
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;
      let profilePhotoUrl = "default";

      await setDoc(doc(db, "users", uid), {
        username: user.username, 
        email: user.email,
        profilePhotoUrl, 
        groups: user.groups
       });

      if(user.profilePhoto){
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto)
      }

      delete user.password; 
      return{...user, profilePhotoUrl, uid}; 

    } catch(error) {
      console.log("Error @createUser:", error.message)
    }
  },

  uploadProfilePhoto: async (uri) => {

    const uid = Firebase.getCurrentUser().uid; 

    try{
      const photo = await Firebase.getBlob(uri)
      const imagesRef = ref(storage, 'profilePhotos');
      const uidRef = ref(imagesRef, uid);

      await uploadBytes(uidRef, photo); 

      const url = await getDownloadURL(ref(storage, uidRef)); 
      const docRef = doc(db, "users", uid);

      await updateDoc(docRef, {
        profilePhotoUrl: url
     });
      return url; 

    }catch(error){
      console.log("Error @uploadProfilePhoto", error)
    }
  },
    
  getBlob: async(uri) => {
    return await new Promise((resolve, reject) => {
      //creates XHR object
      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        resolve(xhr.response)
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"))
      };
      xhr.responseType = "blob";
      //takes in three arguments, type of request, url/file, async or not
      xhr.open("GET", uri, true); 
      xhr.send(null);
    })
  },

  getUserInfo: async (uid) => {
    try{
      const docRef = doc(db, "users", uid);
      const user = await getDoc(docRef);

      if(user.exists()){
        return user.data(); 
      } else {
        console.log("Can't get document @getUserInfo!");
      }
      }catch(error){
        console.log("error @getUserInfo", error)
      }
    },

  SignOutUser: async () => {
    try{
      await AsyncStorage.removeItem("email"); 
      await AsyncStorage.removeItem("password"); 
      await signOut(auth);
      return true; 

    }catch(error){
      console.log("Error @SignOutUser", error)
    }
    return false; 
  }, 

  SignInUser: async (email, password) => {
    try{
      await signInWithEmailAndPassword(auth, email, password); 
    }catch(error){
      console.log("Error @SignInUser", error)
    }
  },

  DeleteUser: async () => {
    try{
      const user = auth.currentUser
      deleteUser(user); 
    }catch(error){
      console.log("Error @DeleteUser", error)
    }
  }, 

  ResetPassword: async (email) => {
    try{
      return await sendPasswordResetEmail(auth, email); 
    }catch(error){
      console.log("Error @ResetPassword", error)
    }
  },

  UpdateEmail: async (email) => {
    try{
      const uid = Firebase.getCurrentUser().uid; 
      await updateEmail(uid, email); 

      const docRef = doc(db, "users", uid);
      //Update the database with the new email address
      await updateDoc(docRef, {
        email: email, 
      });

    }catch(error){
      console.log("Error @UpdateEmail", error)
    }
  },

  UpdatePassword: async (password) => {
    try{
      await updatePassword(currentUser, password);
    }catch(error){
      console.log("Error @UpdatePassword", error)
    }
  },

  UpdateUsername: async (NewUsername) => {
    try{
      const uid = Firebase.getCurrentUser().uid; 
      const docRef = doc(db, "users", uid);

      await updateDoc(docRef, {
        username: NewUsername, 
      });
      
    }catch(error){
      console.log("Error @updateUsername", error)
    }
  },

  ClearCache: async () => {
    try{
      //erases all async storage for all clients libaries
      AsyncStorage.clear();
    } catch {
      console.log("Could not clear cache")
    }
  }, 

  retrieveQR: async () => {
    try{

    } catch {
      console.log("Could not retrive QR")
    }
  }, 
  
  //For å lage ei helt ny gruppe
  CreateNewGroup: async (Groupname, groupid, color, Privacy) => {
    try{

      //Gå også inn på user id og oppdater groups
      const uid = Firebase.getCurrentUser().uid;
      const UserRef = doc(db, "users", uid);
      await updateDoc(UserRef, {
        groups: arrayUnion(groupid)
      });

      //Lagre docsan på id, ikke navn
      const docRef = doc(db, "groups", groupid);
      const docSnap = await getDoc(docRef);
      //Kan være greit å sjekke om brukernavnet finnes fra før
     
      //adds all the users to the database
        
      await setDoc(doc(db, "groups", groupid), {
        groupname: Groupname, 
        groupID: groupid, 
        color: color, 
        members: [uid],
        privacy: Privacy
        //EncodedSVG: encodedData
        //GroupPicture: picture
        });
      
    }catch(error){
      console.log("Error @CreateNewGroup", error)
    }
  }, 

  //for å finne ut av hvilken gruppe profilen tilhører
  RetriveGroupData: async () => {
    try{
      //Returner hvilken gruppe brukeren tilhører
      const uid = Firebase.getCurrentUser().uid;
      const snap = await getDoc(doc(db, "users", uid));
      return snap.data().groups; 
      
    }catch(error){
      console.log("Error @RetriveGroupData", error)
    }
  }, 
  
  //hent ut objektene til gruppene
  LoadGroups: async (array) => {
    try{
      
      const objectList = [];
      var arrayLength = array.length;

      for (var i = 0; i < arrayLength; i++) {
        const Snap = await getDoc(doc(db, "groups", array[i]))
        
        objectList.push({
          groupname: Snap.data().groupname, 
          groupID: Snap.data().groupID, 
          color: Snap.data().color, 
          members: Snap.data().members, 
        })
      }
      //returnerer en Liste med objekter.
      return objectList; 

    } catch {
      console.log("Could not Load Groups")
    }
  }, 


LeaveGroup: async (GroupID) => {
  try{

    //updates the users data
    const uid = Firebase.getCurrentUser().uid;
    const UserRef = doc(db, "users", uid);
    // Atomically remove a region from the "regions" array field.
    await updateDoc(UserRef, {
        groups: arrayRemove(GroupID)
    }); 

   //updates the group data
    const GroupRef = doc(db, "groups", GroupID);
    // Atomically remove a region from the "regions" array field.
    await updateDoc(GroupRef, {
        groups: arrayRemove(uid)
});
    }catch(error){
      console.log("Error @LeaveGroup", error)
    }
  
  }, 

  JoinGroup: async (GroupID) => {

    try{
    //sjekk om ting eksisterer i det hele tatt
     //updates the users data
     const uid = Firebase.getCurrentUser().uid;
     const UserRef = doc(db, "users", uid);
     // Atomically remove a region from the "regions" array field.
     await updateDoc(UserRef, {
         groups: arrayUnion(GroupID)
     }); 
 
    //updates the group data
     const GroupRef = doc(db, "groups", GroupID);
     // Atomically remove a region from the "regions" array field.
     await updateDoc(GroupRef, {
         groups: arrayUnion(uid)
    });
    }catch(error){
      console.log("Error @JoinGroup", error)
    }
  }, 

  AddMemberToGroup: async (member) => {
    try{
      const docRef = doc(db, "users", uid);
      //Update the database with the new email address
      await updateDoc(docRef, {
        Member: member, 
      });
    }catch(error){
      console.log("Error @AddToGroup", error)
    }
  }, 

  AddTask: async () => {
    try{
      await setDoc(doc(db, "users", uid), {
        username: user.username, 
        email: user.email,
        profilePhotoUrl, 
       });
    }catch(error){
      console.log("Error @AddTask", error)
    }
  }, 

  UpdateTask: async () => {
    try{

      const docRef = doc(db, "users", uid);
      //Update the database with the new email address
      await updateDoc(docRef, {
        TaskName: TaskName, 
        Frequency: Frequency

      });

    }catch(error){
      console.log("Error @UpdateTask", error)
    }
  }, 

  AddRoutine: async (TaskName, frequency, Members) => {
    try{

      await setDoc(doc(db, "users", uid), {
        username: user.username, 
        email: user.email,
        profilePhotoUrl, 
       });

    }catch(error){
      console.log("Error @AddRutine", error)
    }
  }, 

  UpdateRoutine: async (TaskName, frequency, Members) => {
    try{
      const docRef = doc(db, "users", uid);
      //Update the database with the new email address
      await updateDoc(docRef, {
        TaskName: TaskName, 
        Frequency: Frequency

      });

    }catch(error){
      console.log("Error @UpdateRutine", error)
    }
  }, 

  TaskComplete: async () => {
    try{

    }catch(error){
      console.log("Error @TaskComplete", error)
    }
  }, 

  StayLoggedIn: async () => {
    try{

    }catch(error){
      console.log("Error @StayLoggedIn", error)
    }
  },


  RetriveMessages: async () => {
    try{
s
      const DocRef = doc(db, "chats", "snusken" );
      const q = query(DocRef, orderBy("createdAt", "desc"));
      //const taskQuery = doc(collection(db, "chats"), where("GroupID", "==", groupID))
      onSnapshot(q, querySnapshot => {
          const MessageArray = []
          querySnapshot.forEach((doc) => {
            MessageArray.push(doc.data())
            console.log("retrived messages", MessageArray)
            return MessageArray; 
          })
      });
    }catch(error){
      console.log("Error @RetriveMessages", error)
      // unsubscribe(); når brukeren går ut av chatterommet
    }
  }, 

  SendMessage: async (text) => {
    
    const uid = Firebase.getCurrentUser().uid;

    try{
      await setDoc(doc(db, "chats", "snusken"), {
        id: uid,
        text, 
      });

      }catch(error){
        console.log("Error @SendMessage", error)
      }
    
    }, 


  RetrivingMessages: async (text) => {
  
    setState({ readError: null });
    try {
      database.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setState({ chats });
      });
    } catch (error) {
      setState({ readError: error.message });
    }
  },

  SendingMessages: async (text) => {
  
    preventDefault();
    setState({ writeError: null });
    try {
      await db.ref("chats").push({
        content: state.content,
        timestamp: Date.now(),
        uid: state.user.uid
      });
      setState({ content: '' });
    } catch (error) {
      setState({ writeError: error.message });
    }
  }, 

  RetriveFeed: async () => {

    const objectList = [];

    try {

      const groups = RetriveGroupsStorage(); 
      console.log(groups)

      var arrayLength = groups.length;

      //Lag en dobbel for loop 
      for(var i = 0; i < arrayLength; i++){

        const docRef = doc(db, "groups", groups[i].groupID); 

        for (var i = 0; i < 10; i++) {
          const Snap = await getDoc(doc(docRef, "posts", array[i]))
          
            objectList.push({
            id: Snap.data().id, 
            user: Snap.data().user, 
            postedAt: Snap.data().postedAt, 
            post: Snap.data().post,   
            PhotoUrl: Snap.data().PhotoUrl, 
            Upvotes: Snap.data().Upvotes, 
          })
        }
      }

      //sorterer arrayet med gruppene.
      SortGroupFeed(objectList); 

    } catch (error) {
      console.log("Error @RetriveFeed", error)
    }
  }, 

AddPost: async (post, groupID) => {
  
  const docRef = doc(db, "groups", groupID); 

  try{
    await setDoc(doc(docRef, "posts", post.id), {
      id: post.id, 
      user: post.user, 
      avatar: post.avatar, 
      postedAt: post.postedAt, 
      post: post.post,   
      Upvotes: post.Upvotes, 
      Downvotes: post.Downvotes
    });

    }catch(error){
      console.log("Error @AddPost", error)
    }
  }, 

UpdatePost: async (post, groupID) => {
  
  const docRef = doc(db, "groups", groupID); 
  const postRef = doc(docRef, "", "")

  try{
    updateDoc(postRef, post)
  }catch{
    console.log("Error @UpdatePost")
  }
}, 

RetriveGroupFeed: async () => {

  try{
    //Gå inn på groups->posts og retrive en oppdatert versjon av den. 
    }catch(error){
      console.log("Error @RetriveGroupFeed", error)
    }
  }, 


RetriveGroupsStorage: async () => {

  try {

    const value = await AsyncStorage.getItem("groups");

    if (value !== null) {
      const parsedJson = JSON.parse(value)
      return parsedJson; 

    }else{
      //henter ut hvilken grupper brukeren tilhører 
      const groups = await firebase.RetriveGroupData(); 
      //returnerer et array av json objekter
      const objectArray = await firebase.LoadGroups(groups); 

      const jsonValue = JSON.stringify(objectArray)
      await AsyncStorage.setItem(
        "groups",
        jsonValue
      );
      return objectArray; 
    }
  } catch (error) {
    console.log("Error @RetriveGroupsStorage", error)
  }
},

SortGroupFeed: async (posts, sortsettings) => {

  try{
    /*sorter postene etter 
    -Upvotes 
    -nylige 
    -

    */
   if(sortsettings === "recent"){
    //sjekker 

   }
   if(sortsettings === "upvotes"){

    
  }

    
    }catch(error){
      console.log("Error @SortGroupFeed", error)
    }
  }, 
  
}; 


const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>; 
}; 

export {FirebaseContext, FirebaseProvider};