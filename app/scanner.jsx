import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CameraView } from 'expo-camera';


export default function Scanner() {
    return (
        <View style = {styles.container}>
            
            <Text>This is another screen</Text>

            <CameraView style = {StyleSheet.absoluteFillObject} 
            facing = "back"
            onBarcodeScanned = {({data}) => {
                console.log("data", data);
            }}
            />


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