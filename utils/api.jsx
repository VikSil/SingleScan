import axios from 'axios';

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

  let signal = null;

  if (typeof details.controller !== 'undefined') {
    signal = details.controller.signal;
  }

  return axios
    .post(URL, json, { headers: headers, signal: signal })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('We Buy Books request canceled');
      } else {
        throw error.response.data;
      }
    });
};

export const getZiffitToken = () => {
  const URL = 'https://sell.worldofbooks.com/en-gb/basket';
  const headers = {
    'Content-Type': 'application/json',
    'X-Region-Id': 'GB',
  };

  return axios
    .get(URL, {
      withCredentials: false,
      headers: headers,
    })
    .then((response) => {
      const setCookieHeader = response.headers['set-cookie'];
      let cookie = '';
      if (response.headers['set-cookie']) {
        cookie = setCookieHeader[0]
          .split(';')[0]
          .trim()
          .replace('authTokenGB=', '');
      } else {
        console.log('No cookie found in response');
        throw {
          'error': { 'response': { 'data': 'No cookie found in response' } },
        };
      }
      return cookie;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const getZiffitOffer = (details) => {
  const URL = 'https://ziffit-recommerce-gateway-eu.ziffit.com/v1/me/cart/scan';
  const json = {
    'ean': details.ISBN,
    'scanOrigin': 'ZIFFIT',
    'scanType': 'MANUAL_ENTRY',
  };
  const token = `Bearer ${details.token}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Region-Id': 'GB',
    'Authorization': token,
  };

  let signal = null;

  if (typeof details.controller !== 'undefined') {
    signal = details.controller.signal;
  }

  return axios
    .post(URL, json, { headers: headers, signal: signal })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Ziffit request canceled');
      } else {
        throw error.response.data;
      }
    });
};

export const getSellItBackOffer = (details) => {
  const URL = `http://sellitback.com/Sellitback.svc/SearchItem?CartID=${details.cartID}&EAN=${details.ISBN}`;

  let signal = null;

  if (typeof details.controller !== 'undefined') {
    signal = details.controller.signal;
  }

  return axios
    .get(URL, { signal: signal })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Sell It Back request canceled');
      } else {
        throw error;
      }
    });
};

export const getCexOffer = (details) => {
  const URL = `https://search.webuy.io/1/indexes/*/queries`;

  const json = `{"requests":[{"indexName":"prod_cex_uk","params":"attributesToRetrieve=%5B%22boxName%22%2C%22imageUrls%22%2C%22cashPriceCalculated%22%5D&page=0&query=${details.ISBN}&userToken=anonymous-32ea09fc-f726-4a8d-871e-b159c75dbf93"}]}`;

  return axios
    .post(URL, json, { signal: details.controller.signal })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Cex request canceled');
      } else {
        throw error.response.data;
      }
    });
};
