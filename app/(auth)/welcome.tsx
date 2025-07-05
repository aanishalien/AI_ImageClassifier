import { router } from "expo-router";
import React from "react";
import { View,Text,Image, StyleSheet, TouchableOpacity } from "react-native";


export default function Welcome(){
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={require('@/assets/images/kingfisher.jpg')}
            />

            <View style={styles.content}>
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/register')}>
                        <Text style={styles.buttonText}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        
    },
    image:{
        
        width:'100%',
        height:770,
    },
    content:{
        backgroundColor:'rgba(0,0,0,0.3)',
        ...StyleSheet.absoluteFillObject
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
    bottomSection:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'rgba(21,101,117, 0.9)',
        paddingHorizontal:30,
        paddingVertical:40,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    }
})


