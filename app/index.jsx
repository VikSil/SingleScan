import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useCameraPermissions } from "expo-camera";
import {Link} from "expo-router";


export default function  Home() {

    const [permission, requestPermission] = useCameraPermissions();
    const permissionGranted= Boolean(permission?.granted);


    return (
        <View style = {styles.container}>
            <Text>
                Home
            </Text>

            <Pressable onPress={requestPermission}><Text style = {styles.button}>Request permissions</Text></Pressable>
            <Link disabled = {!permissionGranted} href= "/scanner">Click Me!</Link>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
    },
    button: {
        color: "green",
        fontSize: 17,
        textAlign: "center",
        padding:20,
    }
})