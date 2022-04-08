import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext"
import {FirebaseContext} from "../context/FirebaseContext"
import { useContext } from "react";
import styled from "styled-components/native"
import LottieView from "lottie-react-native";
import Text from "../components/Text";
import * as SecureStore from 'expo-secure-store';

export default LoadingScreen = () => {

    const firebase = useContext(FirebaseContext); 
    const [_, setUser] = useContext(UserContext); 

    useEffect(() => {
        setTimeout(async () => {

            try{
                const value = await SecureStore.getItemAsync("User");
                console.log(value)
                if (value !== null) {
            
                    const parsedJson = JSON.parse(value)
                    console.log(parsedJson)
                    setUser({
                        username: parsedJson.username,
                        email: parsedJson.email, 
                        groups: [], 
                        profilePhotoUrl: parsedJson.profilePhotoUrl,
                        isLoggedIn: true, 
                    })
                    console.log(_)
                    return; 
                }else{
                    const user = firebase.getCurrentUser()
                    if(user){
                        const userInfo = await firebase.getCurrentUser(user.uid)
        
                        setUser({
                            isLoggedIn: true, 
                            email: userInfo.email, 
                            uid: user.uid, 
                            username: userInfo.username,
                            profilePhotoUrl: userInfo.profilePhotoUrl
                        })
                        console.log("saving to storage")
                        const jsonValue = JSON.stringify(_)
                        await SecureStore.setItemAsync("User", jsonValue);
                    } else {
                        setUser((state) => ({ ...state, isLoggedIn: false})); 
                    }
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