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
  FacebookAuthProvider,
  getRedirectResult,
  signInWithRedirect,

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
  arrayRemove, limit, getDocs, where, 
  } from "firebase/firestore";
import config from "../config/Firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"; 
import * as SecureStore from 'expo-secure-store';

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

  CacheUserContext: async (user) => {

    const jsonValue = JSON.stringify(user)
    await AsyncStorage.setItem("User", jsonValue)
  },    

  //hent ting fra databasen for å oppdatere. Ikke fra telefonen. Consistency
  CacheGroupData: async () => {

      //henter ut hvilken grupper brukeren tilhører 
      const groups = await Firebase.RetriveGroupData(); 

      //returnerer et array av json objekter
      const objectArray = await Firebase.LoadGroups(groups); 

      const jsonValue = JSON.stringify(objectArray)
      await AsyncStorage.setItem(
        "groups",
        jsonValue
      );
  },

  RemoveCacheGroupData: async (groupID) => {

    const value = await AsyncStorage.getItem("groups");
    if (value !== null) {
      //Hent ut data fra async storage
      const parsedJson = JSON.parse(value)
      console.log(parsedJson)

      const indexOfObject = parsedJson.findIndex(object => {
        return object.groupID === groupID;
      });
      
      parsedJson.splice(indexOfObject, 1);
      console.log(parsedJson)

      //prøver å stringifye en tom 
      if (parsedJson.length === 0) {
         console.log("Array is empty!") 
         AsyncStorage.removeItem("groups")
        return 1; 
      }

      //check if the array is empty. If it is put Null inside it. 
      const jsonValue = JSON.stringify(parsedJson)
      await AsyncStorage.setItem(
        "groups",
        jsonValue
      );

      return parsedJson; 

    }else{
     console.log(" no groups to remove in persistent storage") 
    }
 },  

 ClearCacheGroupData: async () => {

  const value = await AsyncStorage.getItem("groups");
  if (value !== null) {

    AsyncStorage.removeItem("groups")

  }else{
   console.log(" no groups to remove in persistent storage") 
  }
},  

ValidateSignUpForm: async (email, password) => {
  try{
    
    //query databasen for en epost
    const UserRef = collection(db, "user");
    const q = query(UserRef, where("email", "==", email));

    if(q != null){
      return 2; 
    } 

    //Sjekk først om legden på passordet er bra nok 
    if(password.length < 6){
      return 1; 
    } 


    //Sjekk med databasen om en bruker har samme epost, brukernavn 
    return; 

  
  } catch(error) {
    console.log("Error @ValidateSignUpForm:", error.message)
  }


},  

  getCurrentUser: () => {
    return auth.currentUser; 
  },

  createUser: async (user) => {

    try{
      await createUserWithEmailAndPassword(auth, user.email, user.password);

      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl = "default";

      console.log("Sets the docs to database")
      
      await setDoc(doc(db, "users", uid), {
        username: user.username, 
        email: user.email,
        password: user.password,
        profilePhotoUrl, 
        groups:[],
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

  uploadGroupPhoto: async (uri, GroupID) => {

    try{
      console.log("1")
      const photo = await Firebase.getBlob(uri)
      const imagesRef = ref(storage, 'GroupPhotos');
      const uidRef = ref(imagesRef, GroupID);

      await uploadBytes(uidRef, photo); 
      console.log("2")
      const url = await getDownloadURL(ref(storage, uidRef)); 
      const GroupRef = doc(db, "groups", GroupID);

      await updateDoc(GroupRef, {
        GroupPhotoUrl: url
     });
     console.log("3")
      return url; 

    }catch(error){
      console.log("Error @uploadGroupPhoto", error)
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

      await SecureStore.deleteItemAsync("User");
    
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

  SignInUserWithFacebook: async () => {
    try{
      const provider = new FacebookAuthProvider();
      console.log(provider)
      // This will trigger a full page redirect away from your app
      await signInWithRedirect(auth, provider);
      // After returning from the redirect when your app initializes you can obtain the result
      const result = await getRedirectResult(auth);
      if (result) {
        // This is the signed-in user
        const user = result.user;
        // This gives you a Facebook Access Token.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
      }
    }catch(error){
      console.log("Error @SignInUserWithFacebook", error)
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
  
  //For å lage ei helt ny gruppe
  CreateNewGroup: async (Group) => {

    try{
      //Gå også inn på user id og oppdater groups
      const uid = Firebase.getCurrentUser().uid;
      const UserRef = doc(db, "users", uid);

      await updateDoc(UserRef, {
        groups: arrayUnion(Group.GroupID)
      });

      let GroupPhotoUrl = "default"
      
      await setDoc(doc(db, "groups", Group.GroupID), {
        groupname: Group.Groupname, 
        groupID: Group.GroupID, 
        color: Group.Color, 
        members: [uid],
        privacy: Group.Privacy,
        GroupPhotoUrl: GroupPhotoUrl
        
        //EncodedSVG: encodedData
        //GroupPicture: picture
      });
      
      if(Group.GroupPhoto){
        GroupPhotoUrl = await Firebase.uploadGroupPhoto(Group.GroupPhoto, Group.GroupID)
      }

      //update persistent storage with the new group
      Firebase.CacheGroupData()
        
    }catch(error){
      console.log("Error @CreateNewGroup", error)
    }
  }, 

   //Returnerer en liste over hvilke grupper man tilhører 
  RetriveGroupData: async () => {
    try{
     
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
          privacy: Snap.data().privacy,
          GroupPhotoUrl: Snap.data().GroupPhotoUrl,
        })
      }; 
      
      //returnerer en Liste med objekter.
      return objectList; 

    } catch(error) {
      console.log("Could not Load Groups", error)
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
          members: arrayRemove(uid)
      });

    }catch(error){
      console.log("Error @LeaveGroup", error)
    }
  }, 

  JoinGroup: async (GroupID) => {

    try{
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
     await updateDoc(GroupRef,{
         members: arrayUnion(uid)
    });

    //get the group data
    let arrayObject = [];
    const Snap = await getDoc(doc(db, "groups", GroupID ))

    arrayObject.push({
      groupname: Snap.data().groupname, 
      groupID: Snap.data().groupID, 
      color: Snap.data().color, 
      members: Snap.data().members, 
      privacy: Snap.data().privacy,
      GroupPhotoUrl: Snap.data().GroupPhotoUrl,
    })

    console.log(arrayObject); 

    //update persistent storage with the new group
    Firebase.CacheGroupData(arrayObject)
    
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

  RetriveFeed: async (SortSettings) => {

    const objectList = [];
    const GroupArray = [];

    try {

      const groups = await Firebase.RetriveGroupsStorage(); 
      
      groups.forEach((doc) => {
        GroupArray.push({
          groupname: doc.groupID, 
        })
      })

      for (let i = 0; i < GroupArray.length; i++) {

        const docRef = doc(db, "groups", GroupArray[i].groupname); 
        const collectionRef = collection(docRef, "posts"); 
  
        const q = query(collectionRef, orderBy("id"), limit(3));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          
            objectList.push({
            id: doc.data().id, 
            user: doc.data().user, 
            avatar: doc.data().avatar, 
            postedAt: doc.data().postedAt, 
            post: doc.data().post,   
            Upvotes: doc.data().Upvotes, 
            Downvotes: doc.data().Downvotes, 
          })
        })
      }
  
      return objectList; 

      const SortedFeed = SortGroupFeed(objectList, SortSettings); 

    }catch (error) {
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

RetriveGroupsStorage: async () => {

  try {

    const value = await AsyncStorage.getItem("groups");

    if (value !== null) {
      const parsedJson = JSON.parse(value)
      return parsedJson; 

    }else{
      //henter ut hvilken grupper brukeren tilhører 
      const groups = await Firebase.RetriveGroupData(); 
      //returnerer et array av json objekter
      const objectArray = await Firebase.LoadGroups(groups); 

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

  ExplorationFeed: async () => {

  try{
    /*
    -Foreslå grupper som e relevant for brukeren
    -Fetch grupper som 
    -Trenger GroupID og GrouppeBilde
    -Trenger flere metrics for hvodan gruppe den er 
    -Fetch Grupper som ligner p
    -Lag en profil på brukeren av appen. Hvordan grupper liker personen

    -Query etter 20 offentlige grupper
    -
    */

    const objectList = [];

    const q = query(collection(db, "groups"), where("privacy", "==", false));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot)

    querySnapshot.forEach((doc) => {
      
        objectList.push({
        groupID: doc.data().groupID, 
        groupname: doc.data().groupname, 
        GroupPhotoUrl: doc.data().GroupPhotoUrl
      })
    })
    
    console.log(objectList)
    return objectList; 
    
    }catch(error){
      console.log("Error @ExplorationFeed", error)
    }
  }, 
  
  ProfileTheUser: async () => {

    try{
      /*
      Try and make a profile
      What data points would i need to suggest the best content?
      -Hvilken type grupper bruker man mest tid i. 
      -Hvilken grupper er andre i samme gruppe med i
      
      */
  
      
      }catch(error){
        console.log("Error @ProfileTheUser", error)
      }
    }, 

  SearchForCommunities: async (Query) => {

    try{

      const groupList = [];

      //Search the database for the words. Either in the group name or 
      //Lag en god blanding 
      const q = query(GroupRef, where("groupname", "==", "Query"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
      
        groupList.push({
        groupID: doc.data().groupID, 
        groupname: doc.data().groupname, 
        GroupPhotoUrl: doc.data().GroupPhotoUrl
      })

      console.log(groupList)
      return groupList; 

    })
      
      }catch(error){
        console.log("Error @SearchForCommunities", error)
      }
    }, 
}; 


const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>; 
}; 

export {FirebaseContext, FirebaseProvider};