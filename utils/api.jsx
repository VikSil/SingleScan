import axios from 'axios';

export const getItemDetails = (ISBN) => {
  const URL = `http://sellitback.com/Sellitback.svc/SearchItem?EAN=${ISBN}`;

  return axios
    .get(URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });

  // return URL;
};

export const getWeBuyBooksToken = () => {
  const URL = 'https://api2.revivalbooks.co.uk/auth/request-token';
  const json = { 'grant_type': 'anonymous_basket' };
  const headers = {
    'Content-Type': 'application/json',
    'X-Revival-Site': 1,
    'Authorization': 'Basic MTpGVlp3YmJXQUVOTUpLTkxS',
  };

  return axios
    .post(URL, json, { headers: headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const getWeBuyBooksOffer = (details) => {
  const URL = 'https://api2.revivalbooks.co.uk/basket/item';
  const json = { 'barcode': details.ISBN };
  const token = `Bearer ${details.token}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Revival-Site': 1,
    'Authorization': token,
  };

  return axios
    .post(URL, json, { headers: headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
