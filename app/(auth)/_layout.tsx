import { Stack } from "expo-router";
import {Provider as PaperProvider} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";


const Layout = () =>{
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <Stack>
                    <Stack.Screen name="regiser" options={{headerShown:false}}/>
                    <Stack.Screen name="index" options={{headerShown:false}}/>
                    <Stack.Screen name="welcome" options={{headerShown:false}}/>

                </Stack>
            </PaperProvider>
        </SafeAreaProvider>
    )
}

export default Layout
