import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: '#483d8b',
  },
  frontPage: {
    justifyContent: 'center',
  },
  button: {
    fontSize: 17,
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#e9967a',
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffe4c4',
    fontWeight: 'bold',
  },
  invisibleButton: {
    display: 'none',
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
    //overflow: 'hidden',
    borderRadius: 30,
    marginBottom: 10,
  },
  barcodeBoxDisabled: {
    backgroundColor: 'red',
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
  },

  dash: {
    height: '13%',
    fontSize: 13,
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: '15%',
  },
});
