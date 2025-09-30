import { StyleSheet, Text, View, AppState, Image } from 'react-native';
import { CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [barcode, setBarcode] = useState('Scan a barcode');

  //   useEffect(() => {
  //     const subscription = AppState.addEventListener('change', (nextAppState) => {
  //       if (
  //         appState.current.match(/inactive|background/) && nextAppState === 'active'
  //       ) {
  //         qrLock.current = false;
  //       }
  //       appState.current = nextAppState;
  //     });

  //     return () => {
  //       subscription.remove();
  //     };
  //   }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.barcodeText}>{barcode}</Text>
      <CameraView
        style={styles.barcodeBox}
        facing='back'
        onBarcodeScanned={({ data }) => {
          if (barcode != data) {
            console.log('data', data);
            setBarcode(data);
          }
        }}
      />
      <View style={styles.itemDetails}>
        <Image
          source={{
            uri: 'http://images.awesomebooks.com/images/books/small/97805/9780552992107.jpg',
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.author}>Author Name</Text>
          <Text style={styles.title}>Book Title</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
  },
  button: {
    color: 'green',
    fontSize: 17,
    textAlign: 'center',
    padding: 20,
  },
  barcodeBox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  barcodeText: {
    color: 'yellow',
    fontSize: 30,
    margin: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    margin : 10,
  },
  author: {
    fontWeight: 'bold',
  },
  title: {
    fontStyle: 'italic',
  },
  image: {
    width: 70,
    height:70,
    resizeMode: 'contain',
    
    

  },
});
