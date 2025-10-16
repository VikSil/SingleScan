import {
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';

import {
  getSellItBackOffer,
  getWeBuyBooksToken,
  getWeBuyBooksOffer,
  getZiffitToken,
  getZiffitOffer,
  getCexOffer,
} from '../utils/api';

import { getSellItBackCartID } from '../utils/helper-functions';

import { styles } from '../assets/styles';

export default function Scanner() {
  const { height } = useWindowDimensions();

  const [barcode, setBarcode] = useState('SCAN A BARCODE');

  const [weBuyBooksToken, setWeBuyBooksToken] = useState(null);
  const [weBuyBooksDash, setWeBuyBooksDash] = useState(null);
  const [ziffitToken, setZiffitToken] = useState(null);
  const [ziffitDash, setZiffitDash] = useState(null);
  const [sellItBackCart, setSellItBackCart] = useState(null);
  const [sellItBackDash, setSellItBackDash] = useState(null);

  const [weBuyBooksAuthor, setWeBuyBooksAuthor] = useState('');
  const [ziffitAuthor, setZiffitAuthor] = useState('');
  const [sellItBackAuthor, setSellItBackAuthor] = useState('');
  const [cexAuthor, setCexAuthor] = useState('');

  const [weBuyBooksTitle, setWeBuyBooksTitle] = useState('');
  const [ziffitTitle, setZiffitTitle] = useState('');
  const [sellItBackTitle, setSellItBackTitle] = useState('');
  const [cexTitle, setCexTitle] = useState('');

  const icon_book = require('../assets/scanner/icon_book.png');
  const icon_X = require('../assets/scanner/icon_X.png');
  const icon_unknown = require('../assets/scanner/icon_unknown.png');

  const [weBuyBooksImage, setWeBuyBooksImage] = useState(icon_book);
  const [ZiffitImage, setZiffitImage] = useState(icon_book);
  const [sellItBackImage, setSellItBackImage] = useState(icon_book);
  const [cexImage, setCexImage] = useState(icon_book);

  const [weBuyBooksOffer, setWeBuyBooksOffer] = useState('');
  const [weBuyBooks4Offer, setWeBuyBooks4Offer] = useState('');
  const [ziffitOffer, setZiffitOffer] = useState('');
  const [ziffit4Offer, setZiffit4Offer] = useState('');
  const [sellItBackOffer, setSellItBackOffer] = useState('');
  const [sellItBack4Offer, setSellItBack4Offer] = useState('');
  const [cexOffer, setCexOffer] = useState('');

  const [weBuyBooksOfferReturned, setWeBuyBooksOfferReturned] = useState(true);
  const [weBuyBooks4OfferReturned, setWeBuyBooks4OfferReturned] =
    useState(true);
  const [ziffitOfferReturned, setZiffitOfferReturned] = useState(true);
  const [ziffit4OfferReturned, setZiffit4OfferReturned] = useState(true);
  const [sellItBackOfferReturned, setSellItBackOfferReturned] = useState(true);
  const [sellItBack4OfferReturned, setSellItBack4OfferReturned] =
    useState(true);
  const [cexOfferReturned, setCexOfferReturned] = useState(true);

  const sellItBackController = useRef(null);
  const sellItBack4Controller = useRef(null);
  const ziffitController = useRef(null);
  const ziffit4Controller = useRef(null);
  const weBuyBooksController = useRef(null);
  const weBuyBooks4Controller = useRef(null);
  const cexController = useRef(null);

  const allReturned = () => {
    if (
      sellItBack4OfferReturned === true &&
      sellItBackOfferReturned === true &&
      weBuyBooks4OfferReturned === true &&
      weBuyBooksOfferReturned === true &&
      ziffit4OfferReturned === true &&
      ziffitOfferReturned === true &&
      cexOfferReturned === true
    ) {
      return true;
    }
    return false;
  };

  const returnAll = () => {
    setSellItBack4OfferReturned(true);
    setSellItBackOfferReturned(true);
    setWeBuyBooks4OfferReturned(true);
    setWeBuyBooksOfferReturned(true);
    setZiffit4OfferReturned(true);
    setZiffitOfferReturned(true);
    setCexOfferReturned(true);
  };

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
        style={
          setCexOfferReturned
            ? [styles.barcodeBox]
            : [styles.barcodeBox, styles.barcodeBoxDisabled]
        }
        facing='back'
        onBarcodeScanned={({ data }) => {
          if (barcode != data && allReturned()) {
            setBarcode(data);
            setSellItBack4OfferReturned(false);
            setSellItBackOfferReturned(false);
            setWeBuyBooks4OfferReturned(false);
            setWeBuyBooksOfferReturned(false);
            setZiffit4OfferReturned(false);
            setZiffitOfferReturned(false);
            setCexOfferReturned(false);

            /* SELL IT BACK OFFER  */
            /* Slowest, so call it first */

            setSellItBackImage(null);
            setSellItBackAuthor('Checking...');
            setSellItBackTitle('');
            setSellItBackOffer('');
            setSellItBack4Offer('');
            setSellItBackDash('');

            const tempSellItBackCart = getSellItBackCartID();

            if (sellItBack4Controller.current) {
              sellItBack4Controller.current.abort();
            }
            if (sellItBackController.current) {
              sellItBackController.current.abort();
            }
            sellItBackController.current = new AbortController();

            getSellItBackOffer({
              'ISBN': data,
              'cartID': tempSellItBackCart,
              'controller': sellItBackController.current,
            })
              .then((sellItBackResponse) => {
                setSellItBackOfferReturned(true);
                if (typeof sellItBackResponse !== 'undefined') {
                  if (sellItBackResponse.Accepted === 1) {
                    setSellItBackOffer(sellItBackResponse.Price);
                    setSellItBackTitle(
                      sellItBackResponse.Title === null
                        ? 'Unknown Title'
                        : sellItBackResponse.Title
                    );
                    setSellItBackImage(
                      sellItBackResponse.ImageURL === null
                        ? icon_book
                        : { uri: sellItBackResponse.ImageURL }
                    );
                    setSellItBackAuthor(
                      sellItBackResponse.Author === null
                        ? 'Unknown Author'
                        : sellItBackResponse.Author
                    );

                    sellItBack4Controller.current = new AbortController();
                    const requestJSON = {
                      'ISBN': data,
                      'cartID': sellItBackCart,
                      'controller': sellItBack4Controller.current,
                    };

                    getSellItBackOffer(requestJSON).then(
                      (sellItBack4Response) => {
                        setSellItBack4OfferReturned(true);
                        if (typeof sellItBack4Response !== 'undefined') {
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
                      }
                    );
                  } else if (!sellItBackResponse.Accepted) {
                    setSellItBackOffer('0.00');
                    setSellItBackAuthor('No Offer');
                    setSellItBackImage(icon_X);
                  } else if (sellItBackResponse.Accepted === -1) {
                    setSellItBackOffer('?');
                    setSellItBackAuthor('Unknown Item');
                    setSellItBackImage(icon_unknown);
                  } else {
                    setSellItBackOffer('X');
                    setSellItBackAuthor('Error!');
                    setSellItBackImage(icon_X);
                  }
                }
              })

              .catch((error) => {
                setSellItBackOfferReturned(true);
                setSellItBack4OfferReturned(true);

                sellItBackOffer('X');
                sellItBackAuthor('Error!');
                setSellItBackImage(icon_X);
              });

            /* WE BUY BOOKS OFFER  */

            setWeBuyBooksImage(null);
            setWeBuyBooksAuthor('Checking...');
            setWeBuyBooksTitle('');
            setWeBuyBooksOffer('');
            setWeBuyBooks4Offer('');
            setWeBuyBooksDash('');

            if (weBuyBooks4Controller.current) {
              weBuyBooks4Controller.current.abort();
            }
            if (weBuyBooksController.current) {
              weBuyBooksController.current.abort();
            }
            weBuyBooksController.current = new AbortController();

            getWeBuyBooksToken().then((weBuyBooksTokenResponse) => {
              const requestJSON = {
                'ISBN': data,
                'token': weBuyBooksTokenResponse.access_token,
                'controller': weBuyBooksController.current,
              };

              getWeBuyBooksOffer(requestJSON)
                .then((weBuyBooksResponse) => {
                  setWeBuyBooksOfferReturned(true);
                  if (typeof weBuyBooksResponse !== 'undefined') {
                    setWeBuyBooksAuthor('');
                    setWeBuyBooksOffer(weBuyBooksResponse.item.price);
                    setWeBuyBooksTitle(weBuyBooksResponse.item.title);
                    setWeBuyBooksImage({
                      uri: weBuyBooksResponse.item.imageUrl,
                    });

                    weBuyBooks4Controller.current = new AbortController();
                    const requestJSON = {
                      'ISBN': data,
                      'token': weBuyBooksToken,
                      'controller': weBuyBooks4Controller.current,
                    };

                    getWeBuyBooksOffer(requestJSON)
                      .then((weBuyBooks4Response) => {
                        setWeBuyBooks4OfferReturned(true);
                        if (typeof weBuyBooks4Response !== 'undefined') {
                          setWeBuyBooksDash('—');
                          setWeBuyBooks4Offer(weBuyBooks4Response.item.price);
                        }
                      })
                      .catch((error) => {
                        setWeBuyBooks4OfferReturned(true);
                        if (error.error == 'not_accepted') {
                          setWeBuyBooksDash('—');
                          setWeBuyBooks4Offer('0.00');
                        } else if (error.error == 'in_basket') {
                          setWeBuyBooksDash('—');
                          setWeBuyBooks4Offer('Dupl');
                        } else if (error.error == 'not_found') {
                        } else {
                          setWeBuyBooksDash('—');
                          setWeBuyBooks4Offer('X');
                        }
                      });
                  }
                })
                .catch((error) => {
                  if (weBuyBooksController.current) {
                    weBuyBooksController.current.abort();
                  }
                  setWeBuyBooksOfferReturned(true);
                  setWeBuyBooks4OfferReturned(true);

                  if (error.error == 'not_accepted') {
                    setWeBuyBooksOffer('0.00');
                    setWeBuyBooksAuthor('No Offer');
                    setWeBuyBooksImage(icon_X);
                  } else if (error.error == 'not_found') {
                    setWeBuyBooksOffer('?');
                    setWeBuyBooksAuthor('Unknown Item');
                    setWeBuyBooksImage(icon_unknown);
                  } else {
                    setWeBuyBooksOffer('X');
                    setWeBuyBooksAuthor('Error!');
                    setWeBuyBooksImage(icon_X);
                  }
                });
            });

            /* ZIFFIT OFFER  */

            setZiffitImage(null);
            setZiffitAuthor('Checking...');
            setZiffitTitle('');
            setZiffitOffer('');
            setZiffitDash('');
            setZiffit4Offer('');

            if (ziffit4Controller.current) {
              ziffit4Controller.current.abort();
            }
            if (ziffitController.current) {
              ziffitController.current.abort();
            }
            ziffitController.current = new AbortController();

            getZiffitToken().then((ZiffitResponse) => {
              const requestJSON = {
                'ISBN': data,
                'token': ZiffitResponse,
                'controller': ziffitController.current,
              };

              getZiffitOffer(requestJSON)
                .then((ziffitResponse) => {
                  setZiffitOfferReturned(true);
                  if (typeof ziffitResponse !== 'undefined') {
                    setZiffitOffer(ziffitResponse.cartItem.offer);
                    setZiffitAuthor(ziffitResponse.cartItem.author);
                    setZiffitTitle(ziffitResponse.cartItem.title);
                    setZiffitImage(icon_book);

                    ziffit4Controller.current = new AbortController();

                    const requestJSON = {
                      'ISBN': data,
                      'token': ziffitToken,
                      'controller': ziffit4Controller.current,
                    };
                    getZiffitOffer(requestJSON)
                      .then((ziffit4Response) => {
                        setZiffit4OfferReturned(true);
                        if (typeof ziffit4Response !== 'undefined') {
                          setZiffitDash('—');
                          setZiffit4Offer(ziffit4Response.cartItem.offer);
                        }
                      })
                      .catch((error) => {
                        setZiffit4OfferReturned(true);
                        const errorMessage = error.error.errorMessages[0];

                        if (errorMessage.includes('N/A')) {
                        } else {
                          setZiffitDash('—');
                          setZiffit4Offer('0.00');
                        }
                      });
                  }
                })
                .catch((error) => {
                  setZiffitOfferReturned(true);
                  if (error.error.errorCode == 'ItemRejectedError') {
                    const errorMessage = error.error.errorMessages[0];

                    if (errorMessage.includes('N/A')) {
                      setZiffitOffer('');
                      setZiffitDash('');
                      setZiffit4Offer('');
                      setZiffitAuthor('Unknown Item');
                      setZiffitTitle('');
                      setZiffitImage(icon_unknown);
                    } else {
                      setZiffitOffer('0.00');
                      setZiffitAuthor('No Offer');
                      setZiffitImage(icon_X);

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
                  } else if (error.error.errorCode == 'ValidationError') {
                    setZiffitOffer('?');
                    setZiffitDash('');
                    setZiffit4Offer('');
                    setZiffitAuthor('Unknown Item');
                    setZiffitTitle('');
                    setZiffitImage(icon_unknown);
                  }
                });
            });

            /* CEX OFFER  */

            setCexImage(null);
            setCexAuthor('Checking...');
            setCexTitle('');
            setCexOffer('');

            if (cexController.current) {
              cexController.current.abort();
            }
            cexController.current = new AbortController();

            getCexOffer({ 'ISBN': data, 'controller': cexController.current })
              .then((cexResponse) => {
                setCexOfferReturned(true);
                if (typeof cexResponse !== 'undefined') {
                  if (cexResponse.results[0].hits.length > 0) {
                    setCexAuthor('');
                    setCexOffer(
                      cexResponse.results[0].hits[0].cashPriceCalculated
                    );
                    setCexTitle(cexResponse.results[0].hits[0].boxName);
                    setCexImage({
                      uri: cexResponse.results[0].hits[0].imageUrls.small,
                    });
                  } else {
                    setCexAuthor('Unknown Item');
                    setCexTitle('');
                    setCexOffer('?');
                    setCexImage(icon_unknown);
                  }
                }
              })
              .catch((error) => {
                setCexOfferReturned(true);
                setCexOffer('X');
                setCexAuthor('Error!');
                setCexTitle('');
                setCexImage(icon_X);
              });
          }
        }}
      >
        <Pressable
          onPress={returnAll}
          style={[allReturned() ? styles.invisibleButton : styles.button]}
        >
          <Text style={styles.buttonText}>SCAN NEXT BARCODE</Text>
        </Pressable>
      </CameraView>

      {/* WE BUY BOOKS OFFER */}

      <View style={styles.itemCard}>
        <View style={styles.itemDetails}>
          <Image
            source={weBuyBooksImage}
            style={[styles.image, { height: height * 0.08 }]}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>
              {weBuyBooksAuthor.length > 20
                ? weBuyBooksAuthor.substring(0, 20) + '...'
                : weBuyBooksAuthor}
            </Text>
            <Text style={styles.title}>
              {weBuyBooksTitle.length > 40
                ? weBuyBooksTitle.substring(0, 40) + '...'
                : weBuyBooksTitle}
            </Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.vendor}
          >
            We Buy Books
          </Text>
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
            source={ZiffitImage}
            style={[styles.image, { height: height * 0.08 }]}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>
              {ziffitAuthor.length > 20
                ? ziffitAuthor.substring(0, 20) + '...'
                : ziffitAuthor}
            </Text>
            <Text style={styles.title}>
              {ziffitTitle.length > 40
                ? ziffitTitle.substring(0, 40) + '...'
                : ziffitTitle}
            </Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.vendor}
          >
            Ziffit
          </Text>
          <Text style={[styles.offer, styles.splitOffer]}>{ziffitOffer}</Text>
          <Text style={[styles.offer, styles.dash]}>{ziffitDash}</Text>
          <Text style={[styles.offer, styles.splitOffer]}>{ziffit4Offer}</Text>
        </View>
      </View>

      {/* SELLITBACK OFFER */}
      <View style={styles.itemCard}>
        <View style={styles.itemDetails}>
          <Image
            source={sellItBackImage}
            style={[styles.image, { height: height * 0.08 }]}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>
              {sellItBackAuthor.length > 20
                ? sellItBackAuthor.substring(0, 20) + '...'
                : sellItBackAuthor}
            </Text>
            <Text style={styles.title}>
              {sellItBackTitle.length > 40
                ? sellItBackTitle.substring(0, 40) + '...'
                : sellItBackTitle}
            </Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.vendor}
          >
            Sell It Back
          </Text>
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
            source={cexImage}
            style={[styles.image, { height: height * 0.08 }]}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.author}>
              {cexAuthor.length > 20
                ? cexAuthor.substring(0, 20) + '...'
                : cexAuthor}
            </Text>
            <Text style={styles.title}>
              {cexTitle.length > 40
                ? cexTitle.substring(0, 40) + '...'
                : cexTitle}
            </Text>
          </View>
        </View>
        <View style={styles.offerDetails}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={styles.vendor}
          >
            Cex
          </Text>
          <Text style={[styles.offer, styles.singleOffer]}>{cexOffer}</Text>
        </View>
      </View>
    </View>
  );
}
