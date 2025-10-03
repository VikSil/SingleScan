import { StyleSheet, Text, View, Image } from 'react-native';
import { CameraView } from 'expo-camera';
import { useEffect, useState } from 'react';

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

  const [weBuyBooksToken, setWeBuyBooksToken] = useState(null);
  const [ziffitToken, setZiffitToken] = useState(null);
  const [sellItBackInitialised, setSellItBackInitialised] = useState(false);
  const [readyToScan, setReadyToScan] = useState(false);

  const [weBuyBooksAuthor, setWeBuyBooksAuthor] = useState('---');
  const [ziffitAuthor, setZiffitAuthor] = useState('---');
  const [sellItBackAuthor, setSellItBackAuthor] = useState('---');
  const [cexAuthor, setCexAuthor] = useState('---');

  const [weBuyBooksTitle, setWeBuyBooksTitle] = useState('---');
  const [ziffitTitle, setZiffitTitle] = useState('---');
  const [sellItBackTitle, setSellItBackTitle] = useState('---');
  const [cexTitle, setCexTitle] = useState('---');

  const [weBuyBooksImage, setWeBuyBooksImage] = useState(
    'https://cdn-icons-png.freepik.com/512/9250/9250447.png'
  );
  const [ZiffitImage, setZiffitImage] = useState(
    'https://cdn-icons-png.freepik.com/512/9250/9250447.png'
  );
  const [sellItBackImage, setSellItBackImage] = useState(
    'https://cdn-icons-png.freepik.com/512/9250/9250447.png'
  );
  const [cexImage, setCexImage] = useState(
    'https://cdn-icons-png.freepik.com/512/9250/9250447.png'
  );

  const [weBuyBooksOffer, setWeBuyBooksOffer] = useState('0.0');
  const [ziffitOffer, setZiffitOffer] = useState('0.0');
  const [sellItBackOffer, setSellItBackOffer] = useState('0.0');
  const [cexOffer, setCexOffer] = useState('0.0');

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
  }, []);

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
                setWeBuyBooksImage(
                  'https://cdn-icons-png.freepik.com/512/3407/3407031.png'
                );
                if (error.error == 'not_accepted') {
                  setWeBuyBooksOffer('No Offer');
                } else if (error.error == 'not_found') {
                  setWeBuyBooksOffer('?');
                } else if (error.error == 'in_basket') {
                  setWeBuyBooksOffer('Scanned Already');
                }
              });

            getZiffitOffer({ ISBN: barcode, token: ziffitToken })
              .then((ziffitResponse) => {
                console.log('Ziffit response ', ziffitResponse);
                setZiffitOffer(ziffitResponse.cartItem.offer);
                setZiffitTitle(ziffitResponse.cartItem.author);
                setZiffitImage('X');
              })
              .catch((error) => {
                console.log('error happened in Ziffit request: ', error);
                setZiffitOffer('X');
                setZiffitTitle('X');
                setZiffitImage(
                  'https://cdn-icons-png.freepik.com/512/3407/3407031.png'
                );
                if (error.error.errorCode == 'ItemRejectedError') {
                  const errorMessage = error.error.errorMessages[0];
                  console.log(errorMessage);
                  if (errorMessage.includes('N/A')) {
                    setZiffitOffer('?');
                  } else {
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
                  setSellItBackAuthor(sellItBackResponse.Author);
                } else if (!sellItBackResponse.Accepted) {
                  setSellItBackOffer('No Offer');
                } else if (sellItBackResponse.Accepted === -1) {
                  setSellItBackOffer('?');
                } else {
                  setSellItBackOffer('Error!');
                }
              })
              .catch((error) => {
                console.log('error happened in sellItBack request: ', error);
                setSellItBackImage(
                  'https://cdn-icons-png.freepik.com/512/3407/3407031.png'
                );
              });
          }
        }}
      />

      {/* WE BUY BOOKS OFFER */}

      <View style={styles.itemCard}>
        <View style={styles.itemDetails}>
          <Image
            source={{
              uri: weBuyBooksImage,
            }}
            style={styles.image}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>{weBuyBooksAuthor}</Text>
            <Text style={styles.title}>{weBuyBooksTitle}</Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.vendor}>We Buy Books</Text>
          <Text style={styles.offer}>{weBuyBooksOffer}</Text>
        </View>
      </View>

      {/* ZIFFIT OFFER */}

      <View style={styles.itemCard}>
        <View style={styles.itemDetails}>
          <Image
            source={{
              uri: ZiffitImage,
            }}
            style={styles.image}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>{ziffitAuthor}</Text>
            <Text style={styles.title}>{ziffitTitle}</Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.vendor}>Ziffit</Text>
          <Text style={styles.offer}>{ziffitOffer}</Text>
        </View>
      </View>

      {/* SELLITBACK OFFER */}
      <View style={styles.itemCard}>
        <View style={styles.itemDetails}>
          <Image
            source={{
              uri: sellItBackImage,
            }}
            style={styles.image}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>{sellItBackAuthor}</Text>
            <Text style={styles.title}>{sellItBackTitle}</Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.vendor}>SellIt Back</Text>
          <Text style={styles.offer}>{sellItBackOffer}</Text>
        </View>
      </View>

      {/* CEX OFFER */}
      <View style={styles.itemCard}>
        <View style={styles.itemDetails}>
          <Image
            source={{
              uri: cexImage,
            }}
            style={styles.image}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>{cexAuthor}</Text>
            <Text style={styles.title}>{cexTitle}</Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.vendor}>Cex</Text>
          <Text style={styles.offer}>{cexOffer}</Text>
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
    backgroundColor: '#483d8b',
  },
  button: {
    color: 'green',
    fontSize: 17,
    textAlign: 'center',
    padding: 20,
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    marginBottom: 10,
  },
  barcodeText: {
    color: '#e9967a',
    fontSize: 30,
    margin: 10,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  itemCard: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    width: 295,
    backgroundColor: '#ffe4c4',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  itemDetails: {
    flexDirection: 'row',
    flexShrink: 1,
  },

  offerDetails: {
    width: 60,
    height: '100%',
  },

  bookDetails: {
    flexShrink: 1,
  },

  author: {
    fontWeight: 'bold',
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#828f9bff',
    fontSize: 15,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  vendor: {
    fontWeight: 'bold',
    textAlign: 'center',
    height: '50%',
    textAlignVertical: 'center',
    color: '#cd5c5c',
  },

  offer: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#379e37ff',
    // textAlign: 'center',
    height: '50%',
    //textAlignVertical:"center",

    paddingLeft: '15%',
    paddingTop: '10%',
  },
});
