import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext"
import {FirebaseContext} from "../context/FirebaseContext"
import { useContext } from "react";
import styled from "styled-components/native"
import LottieView from "lottie-react-native";
import * as SecureStore from 'expo-secure-store';

export default LoadingScreen = () => {

    const firebase = useContext(FirebaseContext); 
    const [User, setUser] = useContext(UserContext); 

    useEffect(() => {
        setTimeout(async () => {

            try{
                const value = await SecureStore.getItemAsync("User");
                
                if (value !== null) {
                    const parsedJson = JSON.parse(value)
                    console.log(parsedJson.uid); 
                        
                    await setUser({
                        username: parsedJson.username,
                        email: parsedJson.email, 
                        uid: parsedJson.uid, 
                        groups: parsedJson.groups, 
                        profilePhotoUrl: parsedJson.profilePhotoUrl,
                        isLoggedIn: parsedJson.isLoggedIn, 
                      })
            
                }else{
                    setUser((state) => ({ ...state, isLoggedIn: false})); 
                }
            }catch(error){
                console.log("Error @uploadProfilePhoto", error)
            }
        }, 500)
    }, [])

    //<AchiveLogo source = {require("../logo/logo.png")} />
    return (
        <Container>

            <LottieView 
                source={require("../assets/prog.json")}
                autoPlay
                loop
                style={{width: "100%", marginBottom: 50}}
                >
            </LottieView>
        </Container>
    );
}

const Container = styled.View`
    flex: 1; 
    align-items: center; 
    justify-content: center; 

`

const AchiveLogo = styled.Image`
    align-items: center; 
    justify-content: center; 
    width: 250px;
    height: 150px;
    margin: 0px 90px 0px; 
`;