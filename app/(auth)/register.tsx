import { View, Image, StyleSheet, TouchableOpacity,Text,TextInput} from 'react-native'
import React,{useState} from 'react'
import { router } from 'expo-router'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';


export default function Register({navigation}){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
 
    const handleLogin = async() =>{
        try{
            const response = await axios.post("http://192.168.8.116:8000/api/v1/users",{
                email,
                password
            });
            console.log("Response:", response.data);

            const message = response.data.message?.trim();

            if (message ==="User created successfully" || message === "Logged in successfully"){
                router.push('/(tabs)/uploadimage');
            } else{
                alert(response.data.message || "Registration failed. Please try again.");
            }
           
            
            

        } catch(error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
    }

    return (
        <>
        <KeyboardAwareScrollView >
            <View>
                <Image 
                    style={styles.image}
                    resizeMode="cover"
                    source={require('@/assets/images/kingfisher.jpg')}
                />
                <View style={styles.content}>
                    <View style={styles.bottomSectionm}>
                        <Text style={styles.heading}>Log In</Text>

                        <Text style={styles.subheading}>Email</Text>
                        <TextInput style={styles.TextInput} onChangeText={setEmail} value={email} placeholder='Email'/>

                        <Text style={styles.subheading}>Password</Text>
                        <TextInput style={styles.TextInput} onChangeText={setPassword} value={password} placeholder='Password'/>

                        <Button style={styles.button} onPress={handleLogin}>
                            <Text >Login</Text>
                        </Button>

                        
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
        
    </>
    )
}

const styles = StyleSheet.create({
    container:{
        gap:16,
        padding:16,
    },
    image:{
        width:'100%',
        height:750,
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:20
    },
    subheading:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:10,
        textAlign:'left'   
    },
    content:{
        backgroundColor:'rgba(0,0,0,0.3)',
        ...StyleSheet.absoluteFillObject
    },
    bottomSectionm:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'rgba(21,101,117, 0.9)',
        paddingHorizontal:30,
        paddingVertical:40,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    button:{
        backgroundColor:'#007AFF',
        paddingVertical:15,
        paddingHorizontal:50,
        borderRadius:10,
        alignSelf:'center'
    },
    buttonText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'600',
        textAlign:'center'
    },
    TextInput:{
        width:'auto',
        height:45,
        borderRadius:6,
        backgroundColor:'#f2f2f2',
        paddingHorizontal:10,
        marginBottom:15,
        shadowColor:'#000',
        shadowOffset:{
            width:1,
            height:1
        },
        shadowOpacity:0.1,
        shadowRadius:2,
        elevation:2,
    }
})