import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext"
import {FirebaseContext} from "../context/FirebaseContext"
import { useContext } from "react";
import styled from "styled-components/native"
import LottieView from "lottie-react-native";
import Text from "../components/Text";

export default LoadingScreen = () => {

    const firebase = useContext(FirebaseContext); 
    const [_, setUser] = useContext(UserContext); 

    useEffect(() => {
        setTimeout(async () => {

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
            } else {
                setUser((state) => ({ ...state, isLoggedIn: false})); 
            }
        }, 500)
    }, [])

    return (
        <Container>
            <Text title color="#88d498">
                Achive
            </Text>

            <LottieView 
                source={require("../assets/loading.json")}
                autoPlay
                loop
                style={{width: "90%"}}
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