import { useLocalSearchParams } from "expo-router";
import { View,Text,StyleSheet ,TouchableOpacity} from "react-native";
import { Asset } from "expo-asset";
import {Image} from "expo-image"
import NavBar from "@/components/NavBar";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function Imageclassy(){
    const { uri } = useLocalSearchParams();
    const raw = Array.isArray(uri) ? uri[0]: uri;
    const imageUri = raw? decodeURIComponent(raw) : null;
    const [prediction, setPrediction] = useState<string | null>(null);


    const classifyImage = async() =>{
        if(!imageUri) return;

        const formData = new FormData();
        formData.append('file',{
            uri:imageUri,
            name:'image.jpg',
            type:'image/jpeg'
        } as any);
        

        try{
            const response = await fetch("http://192.168.43.137:8000/api/v1/images/predict",{
                method:"POST",
                body:formData,
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                
            });

            const data = await response.json();
            console.log("Response JSON:", data);
            alert("Predicted Class:" + data.class_id);
            
        } catch(error){
            console.error("Error uploading image:",error);
            alert("Error uploading image");
        }
    }


    console.log("Image URI:", imageUri);

    if (!imageUri){
        return (
            <View style={styles.container}>
                <Text>No image selected</Text>
            </View>
        );
    }
        return(
            <View style={styles.container}>
                
                <Text>Classify Image</Text>
                <Image source={{ uri:imageUri }} style={styles.image} />
                <TouchableOpacity style={styles.button} onPress={classifyImage}>
                    {prediction && <Text>Predicted Class: {prediction}</Text>}
                </TouchableOpacity>
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image:{
        width: 300,
        height: 300,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor:'lightgray'
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
    }
});