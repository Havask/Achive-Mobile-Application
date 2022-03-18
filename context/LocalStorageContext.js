import React, {useState, createContext} from "react"; 
import AsyncStorage from '@react-native-community/async-storage';

const LocalStorageContext = createContext([{}, () => {}]); 

const LocalStorage = {


    SaveString: async () => {
        try{
            await AsyncStorage.setItem("GroupName", Groupname)
        } catch(err){
          alert(err)
        }
      }, 
    
      LoadString: async () => {
        try{
          let group = await AsyncStorage.getItem("GroupName")
          if(group !== null){
            setGroupName(group); 
          }
        } catch{
          alert(err)
        }
      }, 
    
      RemoveString: async () => {
        try{
            await AsyncStorage.removeItem("GroupName")
        } catch(err){
          alert(err)
        } finally{
          setGroupName(""); 
        }
      }, 

      SaveObject: async (object) => {
        try{
            await AsyncStorage.setItem("GroupName", JSON.stringify(object))
        } catch(err){
          alert(err)
        }
      }, 
    
      LoadObject: async (object) => {
        try{
          let json = await AsyncStorage.getItem("object")
          if(json !== null){
            JSON.parse(json); 
          }
        } catch{
          alert(err)
        }
      }, 
    
      RemoveObject: async (object) => {
        try{
            await AsyncStorage.removeItem("object")
        } catch(err){
          alert(err)
        } 
      }, 
}; 



const LocalStorageProvider  = (props) =>{

    return <LocalStorageContext.Provider value={LocalStorage}>{props.children}</LocalStorageContext.Provider>; 
};


export {LocalStorageContext, LocalStorageProvider}
