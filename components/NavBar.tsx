import React,{useState} from "react";
import { router, useNavigation, useRouter} from "expo-router";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import {useNavigationState} from '@react-navigation/native'


export default function NavBar(){

    const router = useRouter();
    const navigation = useNavigation();

    const currentRouteName = useNavigationState((state) => {
        const index = state?.index ?? 0;
        return state?.routes[index]?.name ?? 'Upload Images'
    })

    const getTitle = (routeName: string) => {
        switch (routeName) {
            case 'uploadimage':
                return 'Upload Images';
            default:
                return routeName;
        }
    }

    return (
        <View style={styles.navbar}>
            <TouchableOpacity>
                <Icon name="chevron-left" size={20} color="#black" onPress={() => router.back()}/>
            </TouchableOpacity>
            <Text style={styles.TextView}>{getTitle(currentRouteName)}</Text>
        </View> 
    )

    
}

const styles =  StyleSheet.create({
    navbar:{
        paddingHorizontal:14,
        paddingVertical:5,   
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    TextView:{
        marginLeft:8,
        fontSize:28,
        color:'#1976d2',
        fontWeight:'bold'
    }
})
