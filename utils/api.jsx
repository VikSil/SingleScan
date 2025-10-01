import axios from 'axios';

export const getSellItBackOffer = (details) => {
  let URL = `http://sellitback.com/Sellitback.svc/SearchItem?EAN=${details.ISBN}`;
  if (details.getOffer) {
    const URL = `http://sellitback.com/Sellitback.svc/SearchItem?CartID=1&EAN=${details.ISBN}`;
  }

  return axios
    .get(URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
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

export const getZiffitToken = () => {
  const URL = 'https://sell.worldofbooks.com/en-gb/basket';
    const headers = {
    'Content-Type': 'application/json',
    'X-Region-Id': "GB",
  };

  return axios
    .get(URL, {
      withCredentials: false,headers: headers
    })
    .then((response) => {
      const setCookieHeader = response.headers['set-cookie'];
      let cookie = '';
      if (response.headers['set-cookie']) {
        cookie = setCookieHeader[0].split(";")[0].trim().replace("authTokenGB=","");

      } else {
        console.log('No cookie found in response');
        throw {"error": {"response": {"data":"No cookie found in response"}}};
      }
      return cookie;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const getZiffitOffer = (details) => {
  const URL = 'https://ziffit-recommerce-gateway-eu.ziffit.com/v1/me/cart/scan';
  const json = {"ean": details.ISBN, "scanOrigin": "ZIFFIT", "scanType": "MANUAL_ENTRY"};
  const token = `Bearer ${details.token}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Region-Id': "GB",
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

export const initialiseSellItBack = () => {
  const URL =
    'http://sellitback.com/Sellitback.svc/SearchItem?CartID=1&EAN=9799984230053';

  return axios
    .get(URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
