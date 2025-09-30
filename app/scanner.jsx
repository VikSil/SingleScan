import { StyleSheet, Text, View, AppState, Image } from 'react-native';
import { CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

import {
  getItemDetails,
  getWeBuyBooksToken,
  getWeBuyBooksOffer,
} from '../utils/api';

export default function Scanner() {
  const [barcode, setBarcode] = useState('Scan a barcode');
  const [imageSource, setImageSource] = useState(
    'https://images.awesomebooks.com/images/books/small/97805/9780552992107.jpg'
  );
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  const [weBuyBooksToken, setWeBuyBooksToken] = useState(null);
  const [ziffitToken, setZiffitToken] = useState(null);
  const [sellItBackBasket, setSellItBackBasket] = useState(null);
  const [readyToScan, setReadyToScan] = useState(false);

  const [weBuyBooksOffer, setWeBuyBooksOffer] = useState('Nothing');
  const [ZiffitOffer, setZiffitOffer] = useState('Nothing');
  const [sellItBackOffer, setSellItBackOffer] = useState('Nothing');

  useEffect(() => {
    if (weBuyBooksToken === null) {
      getWeBuyBooksToken()
        .then((data) => {
          console.log(data);
          setWeBuyBooksToken(data.access_token);
          console.log(weBuyBooksToken);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setReadyToScan(true);
        });
    }
  });

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

            getItemDetails(data)
              .then((data) => {
                //console.log('Item Details response', data);
                setImageSource(data.ImageURL);
                setAuthor(data.Author);
                setTitle(data.Title);
              })
              .catch((error) => {
                console.log('error happened while getting item data: ', error);
              });

            getWeBuyBooksOffer({ ISBN: barcode, token: weBuyBooksToken })
              .then((weBuyBooksResponse) => {
                console.log('BuyBooksResponse response ', weBuyBooksResponse);
                setWeBuyBooksOffer(weBuyBooksResponse.price);
              })
              .catch((error) => {
                console.log('error happened in WeBuy Books request: ', error);
                if (error.error == 'not_accepted') {
                  setWeBuyBooksOffer('No Offer');
                }
                if (error.error == 'not_found') {
                  setWeBuyBooksOffer('Unrecognised');
                }
              });
          }
        }}
      />
      <View style={styles.itemDetails}>
        <Image
          source={{
            uri: imageSource,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View syle={styles.offer}>
        <Text>{weBuyBooksOffer}</Text>
      </View>

      <View syle={styles.offer}>
        <Text>{ZiffitOffer}</Text>
      </View>

      <View syle={styles.offer}>
        <Text>{sellItBackOffer}</Text>
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
    margin: 10,
  },
  author: {
    fontWeight: 'bold',
  },
  title: {
    fontStyle: 'italic',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  offer: {
    fontsize: 30,
    color: 'blue',
    justifyContent: 'center',
    height: 70,
    borderRadius: 20,
    borderColor: 'green',
  },
});
