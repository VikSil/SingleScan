import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import {Link, Stack} from "expo-router";


export default function  Home() {

    const [permission, requestPermission] = useCameraPermissions();
    const permissionGranted= Boolean(permission?.granted);


    return (
        <View style = {styles.container}>
            <Text>
                Home
            </Text>

            <Pressable onPress={requestPermission}><Text style = {styles.button}>Request permissions</Text></Pressable>
            <Link href={"/scanner"} as Child>
                <Pressable disabled ={!permissionGranted}>
                    <Text style = {[styles.button, {color: !permissionGranted ? "red": "green"}]}>ScanCode</Text>
                </Pressable>
            </Link>
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
    }
})