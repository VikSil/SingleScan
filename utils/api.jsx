import axios from "axios";

export const getItemDetails = (ISBN) =>{
    let URL = `http://sellitback.com/Sellitback.svc/SearchItem?EAN=${ISBN}`;

    return axios
    .get(URL)
    .then((response) =>{
        return response.data;
    })
    .catch((error) => {
        throw error
    });

    // return URL;
}