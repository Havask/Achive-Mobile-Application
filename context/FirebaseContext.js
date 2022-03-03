import React, {createContext, useContext} from "react";
import { initializeApp } from 'firebase/app';
import {getDatabase} from "firebase/database"; 
import {getAuth} from "firebase/auth";
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
        } from "firebase/firestore";
        
import config from "../config/Firebase"
import {signInWithEmailAndPassword} from "firebase/auth"; 
import { createUserWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(config);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app); 
const FirebaseContext = createContext(); 

// DOCS: 
//https://firebase.google.com/docs/firestore/manage-data/add-data

const Firebase = {
  
  getCurrentUser: () => {
      return auth.currentUser
    },

    createUser: async (user) => {
      try{
        /*
          await db.collection("users").doc(uid).set({
            username: user.username, 
            email: user.email,
            profilePhotoUrl, 
          })
        */

        await createUserWithEmailAndPassword(auth, user.email, user.password);
        const uid = Firebase.getCurrentUser().uid;
        let profilePhotoUrl = "default";

        await setDoc(doc(db, "users", uid), {
          username: user.username, 
          email: user.email,
          profilePhotoUrl
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

    //function to upload a photo to the firebase user
    uploadProfilePhoto: async (uri) => {
      const uid = Firebase.getCurrentUser().uid; 

      try{

        /*
        const photo = await Firebase.getBlob(uri)
        const imageRef = storage().ref("profilePhotos").child(uid)
        await imageRef.put(photo); 
        const url = await imageRef.getDownloadURL()
        
        //fiks dette -----------------------
        await db.collection("users").doc(uid).update({
          profilePhotoUrl: url
        });
        */

        //uploads a photo to firebase storage
        const imagesRef = ref(storage, 'profilePhotos');
        const uidRef = ref(imagesRef.parent, uid);
        await uploadBytes(uidRef, photo); 
        const url = await getDownloadURL(ref(storage, uidRef)); 

        //updates user docs with the right url 
        const docRef = doc(db, "users", "uid");
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
      })
    },

    getUserInfo: async (uid) => {
      try{
        /*
        //fiks dette -----------------------
        const user = await db.collection("users").doc(uid).get()
        */

        const doc = doc(db, "users", "uid");
        const user = await getDoc(doc);

        if(user.exist){
          console.log("Document data:", user.data());
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

      } catch(error){
        console.log("Error @SignOutUser", error)
      }

      return false; 
    }, 

    SignInUser: async (email, password) => {
      try{
       signInWithEmailAndPassword(auth, email, password); 
      } catch(error){
        console.log("Error @SignInUser")
      }
    },
}; 

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>; 
}; 

export {FirebaseContext, FirebaseProvider};