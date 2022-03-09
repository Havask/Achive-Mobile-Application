import React, {createContext} from "react";
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
        collection,
        arrayUnion,
        arrayRemove,
        } from "firebase/firestore";
import config from "../config/Firebase"
import {signInWithEmailAndPassword, 
        createUserWithEmailAndPassword
        } from "firebase/auth"; 

// Initialize Firebase
const app = initializeApp(config);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app); 
const FirebaseContext = createContext(); 

// DOCS: 
//https://firebase.google.com/docs

//Icons 
//https://icons.expo.fyi/

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
      await auth.signOut();
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
  
  //Trenger en liste med medlemmer 
  CreateNewGroup: async (groupName, usernames) => {
    try{

      const SubRef = collection(db, "Groups", groupName);
      
      //adds all the users to the database
      await setDoc(doc(db, SubRef, "users"), {
        //liste med brukernavn
        username: user.username, 
       });

    }catch(error){
      console.log("Error @CreateNewGroup", error)
    }
  }, 

  AddToGroup: async () => {
    try{

    }catch(error){
      console.log("Error @AddToGroup", error)
    }
  }, 

  AddTask: async () => {
    try{

    }catch(error){
      console.log("Error @AddTask", error)
    }
  }, 

  AddRutine: async () => {
    try{

    }catch(error){
      console.log("Error @AddRutine", error)
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
  }

}; 

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>; 
}; 

export {FirebaseContext, FirebaseProvider};