import { StyleSheet, Text, View, AppState, Image } from 'react-native';
import { CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

import {
  getSellItBackOffer,
  getWeBuyBooksToken,
  getWeBuyBooksOffer,
  initialiseSellItBack,
  getZiffitToken,
  getZiffitOffer,
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
  const [sellItBackInitialised, setSellItBackInitialised] = useState(false);
  const [readyToScan, setReadyToScan] = useState(false);

  const [weBuyBooksTitle, setWeBuyBooksTitle] = useState('---');
  const [ziffitTitle, setZiffitTitle] = useState('---');
  const [sellItBackTitle, setSellItBackTitle] = useState('---');

  const [weBuyBooksImage, setWeBuyBooksImage] = useState(
    'https://images.awesomebooks.com/images/books/small/97805/9780552992107.jpg'
  );
  const [ZiffitImage, setZiffitImage] = useState(
    'https://images.awesomebooks.com/images/books/small/97805/9780552992107.jpg'
  );
  const [sellItBackImage, setSellItBackImage] = useState(
    'https://images.awesomebooks.com/images/books/small/97805/9780552992107.jpg'
  );

  const [weBuyBooksOffer, setWeBuyBooksOffer] = useState('Nothing');
  const [ziffitOffer, setZiffitOffer] = useState('Nothing');
  const [sellItBackOffer, setSellItBackOffer] = useState('Nothing');

  useEffect(() => {
    if (weBuyBooksToken === null) {
      getWeBuyBooksToken()
        .then((data) => {
          console.log(data);
          setWeBuyBooksToken(data.access_token);
          if (ziffitToken != null) {
            setReadyToScan(true);
          }
          console.log(weBuyBooksToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (ziffitToken === null) {
      getZiffitToken()
        .then((data) => {
          console.log(data);
          setZiffitToken(data);
          if (weBuyBooksToken != null) {
            setReadyToScan(true);
          }
          console.log(ziffitToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!sellItBackInitialised) {
      initialiseSellItBack()
        .then((data) => {
          console.log(data);
          setSellItBackInitialised(!data.Accepted);
          console.log(sellItBackInitialised);
        })
        .catch((error) => {
          console.log(error);
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
            //console.log('data', data);
            setBarcode(data);

            getSellItBackOffer({ ISBN: data })
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
                //console.log('BuyBooksResponse response ', weBuyBooksResponse);
                setWeBuyBooksOffer(weBuyBooksResponse.item.price);
                setWeBuyBooksTitle(weBuyBooksResponse.item.title);
                setWeBuyBooksImage(weBuyBooksResponse.item.imageUrl);
              })
              .catch((error) => {
                //console.log('error happened in WeBuy Books request: ', error);
                setWeBuyBooksOffer('X');
                setWeBuyBooksTitle('X');
                setWeBuyBooksImage('X');
                if (error.error == 'not_accepted') {
                  setWeBuyBooksOffer('No Offer');
                } else if (error.error == 'not_found') {
                  setWeBuyBooksOffer('Unrecognised');
                } else if (error.error == 'in_basket') {
                  setWeBuyBooksOffer('Scanned Already');
                }
              });

            getZiffitOffer({ ISBN: barcode, token: ziffitToken })
              .then((ziffitResponse) => {
                console.log('Ziffit response ', ziffitResponse);
                setZiffitOffer(ziffitResponse.cartItem.offer);
                setZiffitTitle(ziffitResponse.cartItem.author);
                setZiffitImage("X");
              })
              .catch((error) => {
                console.log('error happened in Ziffit request: ', error);
                setZiffitOffer('X');
                setZiffitTitle('X');
                setZiffitImage('X');
                if (error.error.errorCode == 'ItemRejectedError') {
                  const errorMessage = error.error.errorMessages[0];
                  console.log(errorMessage);
                  if (errorMessage.includes("N/A")){
                     setZiffitOffer('Unrecognised');
                  }
                  else {
                    setZiffitOffer('No Offer');
                  }
                }
              });

            getSellItBackOffer({ ISBN: data, getOffer: true })
              .then((sellItBackResponse) => {
                //console.log('sellItBackResponse response ', sellItBackResponse);
                if (sellItBackResponse.Accepted === 1) {
                  setSellItBackOffer(sellItBackResponse.Price);
                  setSellItBackTitle(sellItBackResponse.Title);
                  setSellItBackImage(sellItBackResponse.ImageURL);
                } else if (!sellItBackResponse.Accepted) {
                  setSellItBackOffer('No Offer');
                } else if (sellItBackResponse.Accepted === -1) {
                  setSellItBackOffer('Unrecognised');
                } else {
                  setSellItBackOffer('Error!');
                }
              })
              .catch((error) => {
                console.log('error happened in sellItBack request: ', error);
              });
          }
        }}
      />

      {/* ITEM DETAILS */}
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

      {/* WE BUY BOOKS OFFER */}

      <View style={styles.itemDetails}>
        <Image
          source={{
            uri: weBuyBooksImage,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.author}>{weBuyBooksTitle}</Text>
          <Text style={styles.title}>{weBuyBooksOffer}</Text>
        </View>
      </View>

      {/* ZIFFIT OFFER */}

      <View style={styles.itemDetails}>
        <Image
          source={{
            uri: ZiffitImage,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.author}>{ziffitTitle}</Text>
          <Text style={styles.title}>{ziffitOffer}</Text>
        </View>
      </View>

      {/* SELLITBACK OFFER */}
      <View style={styles.itemDetails}>
        <Image
          source={{
            uri: sellItBackImage,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.author}>{sellItBackTitle}</Text>
          <Text style={styles.title}>{sellItBackOffer}</Text>
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
