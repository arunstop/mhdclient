import axios from 'axios';

export const Api = axios.create({
  // baseURL: "http://192.168.1.3/MHD-API/api/",
  baseURL: "https://mhd-api.000webhostapp.com/api/",
  headers: {
    //   'X-Requested-With': "XMLHttpRequest",
    'Content-Type': "multipart/form-data",
  }

});

const imgurClientId = "70bd9800f118bdf";

export const ApiImgur = axios.create({
  // baseURL: "http://192.168.1.3/MHD-API/api/",
  baseURL: "https://api.imgur.com/3/",
  headers: {
    //   'X-Requested-With': "XMLHttpRequest",
    'Authorization': "Client-ID " + imgurClientId,
    'Content-Type': "multipart/form-data",
  }

});

export default Api;