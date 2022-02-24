import React, {createContext} from "react";
import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";
import config from "../config/Firebase"
import {signInWithEmailAndPassword} from "firebase/auth"; 
import { createUserWithEmailAndPassword } from "firebase/auth";


const FirebaseContext = createContext(); 

// Initialize Firebase
const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app); 

const Firebase = {

    getCurrentUser: () => {
      return auth.currentUser
    },

    createUser: async (user) => {

      try{

        await createUserWithEmailAndPassword(auth, user.email, user.password);

        const uid = Firebase.getCurrentUser().uid;
        let profilePhotoUrl = "default";
        
        await db.collection("users").doc(uid).set({
          username: user.username, 
          email: user.email,
          profilePhotoUrl
        })

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
        const imageRef = storage().ref("profilePhotos").child(uid)

        await imageRef.put(photo); 
        const url = await imageRef.getDownloadURL()

        await db.collection("users").doc(uid).update({
          profilePhotoUrl: url
        });

        return url; 

      }catch(error){
        console.log("Error @uploadProfilePhoto", error)
      }
    },
    
    getBlob: async(uri) => {
      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
          resolve(xhr.response)
        };
        xhr.onerror = () => {
          reject(new TypeError("Network request failed"))
        };

        xhr.responseType = "blob";
        xhr.open("GET", uri, true); 
      })
    },

    getUserInfo: async (uid) => {
      try{
        const user = await db.collection("users").doc(uid).get()
        if(user.exist){
          return user.data()
        }
      }catch(error){
        console.log("error @getUserInfo", error)
      }
    },

    SignOutUser: async () => {
    
      auth
      .signOut()
      .then(() => {
        navigation.replace("LogInScreen")
      })
      .catch(error=> alert(error.message))
    }
}; 

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>; 
}; 

export {FirebaseContext, FirebaseProvider};