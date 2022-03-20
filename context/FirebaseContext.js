import React, {createContext, useState,useEffect,
        useLayoutEffect,useCallback } from "react";
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
      await signOut();
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

  retrieveQR: async () => {
    try{

    } catch {
      console.log("Could not retrive QR")
    }
  }, 
  
  //Trenger en liste med medlemmer 
  CreateNewGroup: async (Groupname, id, color) => {
    try{

      //Gå også inn på user id og oppdater groups

      const uid = Firebase.getCurrentUser().uid;

      const UserRef = doc(db, "users", uid);
      await updateDoc(UserRef, {
        groups: id
      });

      //Lagre docsan på id, ikke navn
      const docRef = doc(db, "groups", id);
      const docSnap = await getDoc(docRef);
      //Kan være greit å sjekke om brukernavnet finnes fra før
      if (docSnap.exists()) {
        console.log("Error: GroupCode already exist");
        //generer en ny kode og putt den som ref

      } else {
        //adds all the users to the database
        await setDoc(doc(db, "groups", id), {
          groupname: Groupname, 
          groupID: id, 
          color: color, 
          //EncodedSVG: encodedData
          //GroupPicture: picture
         });
      }
    }catch(error){
      console.log("Error @CreateNewGroup", error)
    }
  }, 

  RetriveGroupData: async () => {
    //Returner hvilken gruppe brukeren tilhører
    const uid = Firebase.getCurrentUser().uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap);
      return docSnap.data(); 

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }, 

  LoadGroups: async (id) => {

    try{

      //gå først til brukeren å få iden til gruppa som dem er med i
      const docRef = doc(db, "groups", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap; 
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    } catch {
      console.log("Could not retrive Groups")
    }

  }, 

  

  AddMemberToGroup: async (id) => {


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

  SendMessage: async (messages) => {
    messages.forEach(item => {

      const message = {
        text: item.text,
        timestamp: 
        user.item.user
      }
      db.push(message)
    })

  },

  unsub: async () => {

    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
  
    onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
  }, 


SendMessage: async (id, createdAt, text, user) => {

  addDoc(collection(db, 'chats'), {
    _id,
    createdAt,
    text,
    user
  });
}, 

}; 

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>; 
}; 

export {FirebaseContext, FirebaseProvider};