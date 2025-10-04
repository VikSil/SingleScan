import { StyleSheet, Text, View, Image } from 'react-native';
import { CameraView } from 'expo-camera';
import { useEffect, useState } from 'react';

import {
  getSellItBackOffer,
  getWeBuyBooksToken,
  getWeBuyBooksOffer,
  getZiffitToken,
  getZiffitOffer,
} from '../utils/api';

import { getSellItBackCartID } from '../utils/helper-functions';

export default function Scanner() {
  const [barcode, setBarcode] = useState('Scan a barcode');

  const [weBuyBooksToken, setWeBuyBooksToken] = useState(null);
  const [weBuyBooksDash, setWeBuyBooksDash] = useState(null);
  const [ziffitToken, setZiffitToken] = useState(null);
  const [ziffitDash, setZiffitDash] = useState(null);
  const [sellItBackCart, setSellItBackCart] = useState(null);
  const [sellItBackDash, setSellItBackDash] = useState(null);

  const [weBuyBooksAuthor, setWeBuyBooksAuthor] = useState('');
  const [ziffitAuthor, setZiffitAuthor] = useState('');
  const [sellItBackAuthor, setSellItBackAuthor] = useState('');
  const [cexAuthor, setCexAuthor] = useState('---');

  const [weBuyBooksTitle, setWeBuyBooksTitle] = useState('');
  const [ziffitTitle, setZiffitTitle] = useState('');
  const [sellItBackTitle, setSellItBackTitle] = useState('');
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

  const [weBuyBooksOffer, setWeBuyBooksOffer] = useState('');
  const [weBuyBooks4Offer, setWeBuyBooks4Offer] = useState('');
  const [ziffitOffer, setZiffitOffer] = useState('');
  const [ziffit4Offer, setZiffit4Offer] = useState('');
  const [sellItBackOffer, setSellItBackOffer] = useState('');
  const [sellItBack4Offer, setSellItBack4Offer] = useState('');

  const [cexOffer, setCexOffer] = useState('0.0');

  useEffect(() => {
    const getBB4Token = async () => {
      const data = await getWeBuyBooksToken();
      setWeBuyBooksToken(data.access_token);

      const barcodes = [
        '9780753510339', //GI Guide
        '9780552992107', //Harnessing Peacock
        '9780553513363', //Fox in Socks
        '9780349105635', //Mary Breasted
      ];
      for (let i = 0; i < barcodes.length; i++) {
        const requestJSON = { 'ISBN': barcodes[i], 'token': data.access_token };
        await getWeBuyBooksOffer(requestJSON);
      }
    };

    const getZToken = async () => {
      const data = await getZiffitToken();
      setZiffitToken(data);

      const barcodes = [
        '5051892011136', // Rumpus CD
        '9780753510339', //GI Guide
        '9780552992107', //Harnessing Peacock
        '9780349105635', //Mary Breasted
      ];

      for (let i = 0; i < barcodes.length; i++) {
        const requestJSON = { 'ISBN': barcodes[i], 'token': data };
        await getZiffitOffer(requestJSON);
      }
    };

    const initialiseSellItBackCart = async () => {
      const cartID = getSellItBackCartID();
      setSellItBackCart(cartID);

      const barcodes = [
        '9780753510339', //GI Guide
        '9780552992107', //Harnessing Peacock
        '9780553513363', //Fox in Socks
        '9780349105635', //Mary Breasted
      ];
      for (let i = 0; i < barcodes.length; i++) {
        const requestJSON = { 'ISBN': barcodes[i], 'cartID': cartID };
        await getSellItBackOffer(requestJSON);
      }
    };

    if (weBuyBooksToken === null) {
      getBB4Token().catch((error) => {
        console.log(error);
      });
    }

    if (ziffitToken === null) {
      getZToken().catch((error) => {
        console.log(error);
      });
    }

    if (sellItBackCart === null) {
      initialiseSellItBackCart();
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
            setBarcode(data);

            /* WE BUY BOOKS OFFER  */

            setWeBuyBooksImage('');
            setWeBuyBooksAuthor('');
            setWeBuyBooksTitle('');
            setWeBuyBooksOffer('');
            setWeBuyBooks4Offer('');
            setWeBuyBooksDash('');

            getWeBuyBooksToken().then((weBuyBooksTokenResponse) => {
              const requestJSON = {
                'ISBN': data,
                'token': weBuyBooksTokenResponse.access_token,
              };

              getWeBuyBooksOffer(requestJSON)
                .then((weBuyBooksResponse) => {
                  setWeBuyBooksOffer(weBuyBooksResponse.item.price);
                  setWeBuyBooksTitle(weBuyBooksResponse.item.title);
                  setWeBuyBooksImage(weBuyBooksResponse.item.imageUrl);

                  const requestJSON = {
                    'ISBN': data,
                    'token': weBuyBooksToken,
                  };

                  getWeBuyBooksOffer(requestJSON)
                    .then((weBuyBooks4Response) => {
                      setWeBuyBooksDash('—');
                      setWeBuyBooks4Offer(weBuyBooks4Response.item.price);
                    })
                    .catch((error) => {
                      if (error.error == 'not_accepted') {
                        setWeBuyBooksDash('—');
                        setWeBuyBooks4Offer('0.00');
                      } else if (error.error == 'in_basket') {
                        setWeBuyBooksDash('—');
                        setWeBuyBooks4Offer('R');
                      } else if (error.error == 'not_found') {
                      } else {
                        setWeBuyBooksDash('—');
                        setWeBuyBooks4Offer('X');
                      }
                    });
                })
                .catch((error) => {
                  if (error.error == 'not_accepted') {
                    setWeBuyBooksOffer('0.00');
                    setWeBuyBooksAuthor('No Offer');
                    setWeBuyBooksImage(
                      'https://i.postimg.cc/Bnj8DR83/3407031.png'
                    );
                  } else if (error.error == 'not_found') {
                    setWeBuyBooksOffer('?');
                    setWeBuyBooksAuthor('Unknown Item');
                    setWeBuyBooksImage(
                      'https://cdn-icons-png.freepik.com/512/3407/3407031.png'
                    );
                  } else {
                    setWeBuyBooksOffer('X');
                    setWeBuyBooksAuthor('Error!');
                    setWeBuyBooksImage(
                      'https://i.postimg.cc/Bnj8DR83/3407031.png'
                    );
                  }
                });
            });

            /* ZIFFIT OFFER  */

            setZiffitImage('');
            setZiffitAuthor('');
            setZiffitTitle('');
            setZiffitOffer('');
            setZiffitDash('');
            setZiffit4Offer('');

            getZiffitToken().then((ZiffitResponse) => {
              const requestJSON = {
                ISBN: data,
                token: ZiffitResponse,
              };

              getZiffitOffer(requestJSON)
                .then((ziffitResponse) => {
                  setZiffitOffer(ziffitResponse.cartItem.offer);
                  setZiffitAuthor(ziffitResponse.cartItem.author);
                  setZiffitTitle(ziffitResponse.cartItem.title);
                  setZiffitImage(
                    'https://cdn-icons-png.freepik.com/512/9250/9250447.png'
                  );

                  const requestJSON = {
                    'ISBN': data,
                    'token': ziffitToken,
                  };

                  getZiffitOffer(requestJSON)
                    .then((ziffit4Response) => {
                      setZiffitDash('—');
                      setZiffit4Offer(ziffit4Response.cartItem.offer);
                    })
                    .catch((error) => {
                      const errorMessage = error.error.errorMessages[0];

                      if (errorMessage.includes('N/A')) {
                      } else {
                        setZiffitDash('—');
                        setZiffit4Offer('0.00');
                      }
                    });
                })
                .catch((error) => {
                  if (error.error.errorCode == 'ItemRejectedError') {
                    const errorMessage = error.error.errorMessages[0];

                    if (errorMessage.includes('N/A')) {
                      setZiffitOffer('');
                      setZiffitDash('');
                      setZiffit4Offer('');
                      setZiffitAuthor('Unknown Item');
                      setZiffitTitle('');
                      setZiffitImage(
                        'https://cdn-icons-png.freepik.com/512/3407/3407031.png'
                      );
                    } else {
                      setZiffitOffer('0.00');
                      setZiffitAuthor('No Offer');
                      setZiffitImage(
                        'https://i.postimg.cc/Bnj8DR83/3407031.png'
                      );

                      if (errorMessage.includes("Sorry, we're not buying ")) {
                        const stringTail = ' at the moment,';
                        const tailStart = errorMessage.indexOf(stringTail);
                        const titleLength = tailStart - 24;
                        setZiffitTitle(errorMessage.substring(24, titleLength));
                      } else if (
                        errorMessage.includes("Unfortunately we don't accept ")
                      ) {
                        setZiffitTitle(
                          errorMessage.substring(30, errorMessage.length - 1)
                        );
                      } else {
                        setZiffitAuthor('Item Not Accepted');
                      }
                    }
                  }
                });
            });

            /* SELL IT BACK OFFER  */

            setSellItBackImage('');
            setSellItBackAuthor('');
            setSellItBackTitle('');
            setSellItBackOffer('');
            setSellItBack4Offer('');
            setSellItBackDash('');

            const tempSellItBackCart = getSellItBackCartID();

            getSellItBackOffer({
              'ISBN': data,
              'cartID': tempSellItBackCart,
            })
              .then((sellItBackResponse) => {
                if (sellItBackResponse.Accepted === 1) {
                  setSellItBackOffer(sellItBackResponse.Price);
                  setSellItBackTitle(
                    sellItBackResponse.Title === null
                      ? 'Unknown Title'
                      : sellItBackResponse.Title
                  );
                  setSellItBackImage(
                    sellItBackResponse.ImageURL === null
                      ? 'https://cdn-icons-png.freepik.com/512/9250/9250447.png'
                      : sellItBackResponse.ImageURL
                  );
                  setSellItBackAuthor(
                    sellItBackResponse.Author === null
                      ? 'Unknown Author'
                      : sellItBackResponse.Author
                  );

                  const requestJSON = {
                    'ISBN': data,
                    'cartID': sellItBackCart,
                  };

                  getSellItBackOffer(requestJSON).then(
                    (sellItBack4Response) => {
                      if (sellItBack4Response.Accepted === 1) {
                        setSellItBackDash('—');
                        setSellItBack4Offer(sellItBack4Response.Price);
                      } else if (!sellItBack4Response.Accepted) {
                        setSellItBackDash('—');
                        setSellItBack4Offer('0.00');
                      } else {
                        setSellItBackDash('—');
                        setSellItBack4Offer('X');
                      }
                    }
                  );
                } else if (!sellItBackResponse.Accepted) {
                  setSellItBackOffer('0.00');
                  setSellItBackAuthor('No Offer');
                  setSellItBackImage(
                    'https://i.postimg.cc/Bnj8DR83/3407031.png'
                  );
                } else if (sellItBackResponse.Accepted === -1) {
                  setSellItBackOffer('?');
                  setSellItBackAuthor('Unknown Item');
                  setSellItBackImage(
                    'https://cdn-icons-png.freepik.com/512/3407/3407031.png'
                  );
                } else {
                  setSellItBackOffer('X');
                  setSellItBackAuthor('Error!');
                  setSellItBackImage(
                    'https://i.postimg.cc/Bnj8DR83/3407031.png'
                  );
                }
              })

              .catch((error) => {
                sellItBackOffer('X');
                sellItBackAuthor('Error!');
                setSellItBackImage('https://i.postimg.cc/Bnj8DR83/3407031.png');
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
            <Text style={styles.title}>
              {weBuyBooksTitle.length > 50
                ? weBuyBooksTitle.substring(0, 50) + '...'
                : weBuyBooksTitle}
            </Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.vendor}>We Buy Books</Text>
          <Text style={[styles.offer, styles.splitOffer]}>
            {weBuyBooksOffer}
          </Text>
          <Text style={[styles.offer, styles.dash]}>{weBuyBooksDash}</Text>
          <Text style={[styles.offer, styles.splitOffer]}>
            {weBuyBooks4Offer}
          </Text>
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
            <Text style={styles.title}>
              {ziffitTitle.length > 50
                ? ziffitTitle.substring(0, 50) + '...'
                : ziffitTitle}
            </Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.vendor}>Ziffit</Text>
          <Text style={[styles.offer, styles.splitOffer]}>{ziffitOffer}</Text>
          <Text style={[styles.offer, styles.dash]}>{ziffitDash}</Text>
          <Text style={[styles.offer, styles.splitOffer]}>{ziffit4Offer}</Text>
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
            <Text style={styles.title}>
              {sellItBackTitle.length > 50
                ? sellItBackTitle.substring(0, 50) + '...'
                : sellItBackTitle}
            </Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.vendor}>Sell It Back</Text>
          <Text style={[styles.offer, styles.splitOffer]}>
            {sellItBackOffer}
          </Text>
          <Text style={[styles.offer, styles.dash]}>{sellItBackDash}</Text>
          <Text style={[styles.offer, styles.splitOffer]}>
            {sellItBack4Offer}
          </Text>
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
          <Text style={styles.splitOffer}>{cexOffer}</Text>
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
    paddingRight: 5,
  },
  itemDetails: {
    flexDirection: 'row',
    flexShrink: 1,
  },

  offerDetails: {
    width: 60,
    height: '100%',
    flexShrink: 1,
  },

  bookDetails: {
    flexShrink: 1,
  },

  author: {
    fontWeight: 'bold',
    color: '#483d8b',
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
    height: '40%',
    textAlignVertical: 'center',
    color: '#cd5c5c',
  },

  offer: {
    fontWeight: 'bold',
    color: '#379e37ff',
    textAlign: 'center',
    textAlignVertical: 'center',

    paddingRight: '10%',
  },

  singleOffer: {
    height: '60%',
    fontSize: 20,
    paddingLeft: '9%',
  },

  splitOffer: {
    paddingLeft: '15%',
    height: '20%',
    fontSize: 18,
  },

  dash: {
    height: '13%',
    fontSize: 13,
    marginTop: 0,
    paddingTop: 0,
  },
});
