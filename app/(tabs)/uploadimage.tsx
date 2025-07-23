import React, { useState } from "react";
import { View ,Text, StyleSheet, Alert, TouchableOpacity, Image} from "react-native";
import NavBar from "@/components/NavBar";
import * as ImagePicker from "expo-image-picker"
import  Icon  from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";


export default function UploadImage() {

    //Router for navigation
    const router = useRouter();

    //Stores the selected image URL
    const [file, setFile] = useState<string | null>(null);

    //Stores any error message
    const [error, setError] = useState(null);


    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(false);
    //Function to pick an image from 
    // the device's media library

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== "granted"){
            //If permission is denied , show an alert

            Alert.alert(
                "Permission Denied",
                `Sorry, we need camera
                roll permission to upload images.`
            );

        } else{
            const result = 
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:1,
                base64:true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const base64 = result.assets[0].base64;
                const uri = `data:image/jpeg;base64,${base64}`;
                

                router.push({
                    pathname:'/(tabs)/imageclassy',
                    params: { uri},
                })
            } else{
                setLoading(false);
                console.log("Image selection canceled.")
            }
        }
    }

    return(
        <View style={styles.container}>
            <NavBar/>
            <Text style={styles.heading}>Image Classification</Text>
                <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            <View style={styles.bottomSection}>
                
                <Text style={styles.heading}>Add Image:</Text>
                <View style={styles.iconContainer}>
                    <Icon name="cloud-upload" size={25} color="#fff"/>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Choose Image</Text>
                    
                </TouchableOpacity>

                {file ? (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: file}} style={styles.image}/>
                    </View>
                ):(
                    <Text style={styles.errorText}>{error}</Text>
                )}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:2,
        backgroundColor:'#fff'
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:15,
        textAlign:'center'
    },
    text:{
        fontSize:15,
        
        marginTop:10,
        textAlign:'justify'
    },
    content:{
        backgroundColor:'rgba(0,0,0,0.3)',
        ...StyleSheet.absoluteFillObject
    },
    bottomSection:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'rgba(21,101,117, 0.9)',
        paddingHorizontal:10,
        paddingVertical:40,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    button:{
        backgroundColor:"#007AFF",
        padding:10,
        borderRadius:8,
        marginBottom:16,
        shadowColor:"#000000",
        shadowOffset: {width:0 , height:2},
        shadowOpacity:0.4,
        shadowRadius:4,
        elevation:5
    },
    buttonText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"bold"
    },
    imageContainer:{
        borderRadius:8,
        marginBottom:16,
        shadowColor:"#000000",
        shadowOffset: {width: 0 , height:2},
        shadowOpacity: 0.4,
        shadowRadius:4,
        elevation: 5,
    },
    errorText:{
        color:"red",
        marginTop:16
    },
    image:{
        width:200,
        height:200,
        borderRadius:8
    },
    iconContainer:{
        alignItems:'center',
        justifyContent:'center',
    }
})